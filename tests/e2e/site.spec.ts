import { test, expect, type Page } from "@playwright/test";
import { getProjects } from "../../constants/content";
import { profile } from "../../constants/profile";

const locales = [
  { lang: "en", dir: "ltr", home: "/", switchTo: "/ar" },
  { lang: "ar", dir: "rtl", home: "/ar", switchTo: "/" },
] as const;

/** Wait for the short intro curtain to lift */
async function waitForIntro(page: Page) {
  await expect(page.locator('[role="status"]')).toHaveCount(0, { timeout: 15_000 });
}

/** Collect page errors and same-origin requests that fail */
function watchErrors(page: Page) {
  const problems: string[] = [];
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`console: ${m.text()}`);
  });
  page.on("response", (r) => {
    const url = new URL(r.url());
    if (url.hostname === "localhost" && r.status() >= 400) problems.push(`${r.status()} ${url.pathname}`);
  });
  return problems;
}

for (const l of locales) {
  test.describe(`${l.lang.toUpperCase()} home`, () => {
    test("renders with the right language, direction and content", async ({ page }) => {
      const problems = watchErrors(page);
      await page.goto(l.home);
      await waitForIntro(page);

      const html = page.locator("html");
      await expect(html).toHaveAttribute("lang", l.lang);
      await expect(html).toHaveAttribute("dir", l.dir);
      await expect(page.locator("h1").first()).toBeVisible();
      for (const id of ["about", "experience", "principles", "work", "tech-stack", "contact"]) {
        await expect(page.locator(`#${id}`)).toHaveCount(1);
      }
      // Every featured project is on the page, under its localized title
      for (const p of getProjects(l.lang).filter((x) => x.featured)) {
        await expect(page.locator("#work h3", { hasText: p.title }).first()).toBeAttached();
      }
      expect(problems, problems.join("\n")).toEqual([]);
    });

    test("has no horizontal overflow at common widths", async ({ page }) => {
      for (const width of [320, 375, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(l.home);
        await waitForIntro(page);
        for (const id of ["hero", "about", "experience", "work", "contact"]) {
          await page.locator(`#${id}`).scrollIntoViewIfNeeded();
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          expect(overflow, `${width}px #${id}`).toBeLessThanOrEqual(1);
        }
      }
    });

    test("language switch points at the other locale", async ({ page }) => {
      await page.goto(l.home);
      await waitForIntro(page);
      const link = page.locator(`a[hreflang="${l.lang === "en" ? "ar" : "en"}"]`).first();
      await expect(link).toHaveAttribute("href", l.switchTo);
      await link.click();
      await expect(page.locator("html")).toHaveAttribute("lang", l.lang === "en" ? "ar" : "en");
    });

    test("contact links use the verified profile", async ({ page }) => {
      await page.goto(l.home);
      await waitForIntro(page);
      const contact = page.locator("#contact");
      await expect(contact.locator(`a[href="${profile.linkedin}"]`)).toHaveCount(1);
      await expect(contact.locator(`a[href="${profile.github}"]`)).toHaveCount(1);
      await expect(contact.locator(`a[href="${profile.cv.visual}"]`)).toHaveCount(1);
      await expect(contact.locator(`a[href="${profile.cv.ats}"]`)).toHaveCount(1);
      await expect(contact.locator(`a[href^="mailto:${profile.email}"]`)).toHaveCount(1);
    });
  });
}

test.describe("case studies", () => {
  for (const l of locales) {
    for (const p of getProjects(l.lang)) {
      test(`${l.lang} /work/${p.slug}`, async ({ page }) => {
        const prefix = l.lang === "en" ? "" : "/ar";
        const res = await page.goto(`${prefix}/work/${p.slug}`);
        expect(res?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("dir", l.dir);
        await expect(page.locator("h1")).toHaveText(p.title);
        // the cover image actually loads
        const img = page.locator("main img").first();
        await expect(img).toBeVisible();
        expect(await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      });
    }
  }
});

test.describe("files and routes", () => {
  test("both CV files download as PDFs", async ({ request }) => {
    for (const path of [profile.cv.visual, profile.cv.ats, "/resume.pdf"]) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      expect(res.headers()["content-type"], path).toContain("application/pdf");
    }
  });

  test("sitemap, robots and the /en redirect", async ({ request }) => {
    expect((await request.get("/sitemap.xml")).status()).toBe(200);
    expect((await request.get("/robots.txt")).status()).toBe(200);
    const res = await request.get("/en", { maxRedirects: 0 });
    expect([301, 308]).toContain(res.status());
    expect(res.headers()["location"]).toMatch(/\/$/);
  });
});

test.describe("interaction", () => {
  test("command palette opens with Ctrl+K and closes with Escape", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard shortcut is a desktop feature");
    await page.goto("/");
    await waitForIntro(page);
    await page.keyboard.press("Control+k");
    const input = page.locator('input[type="text"]');
    await expect(input).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(input).toHaveCount(0);
  });

  test("touch screens show every role's details without tapping", async ({ page, isMobile }) => {
    test.skip(!isMobile, "touch-only behaviour");
    await page.goto("/");
    await waitForIntro(page);
    const lists = page.locator("#experience ul");
    await lists.first().scrollIntoViewIfNeeded();
    const heights = await lists.evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));
    expect(heights.length).toBeGreaterThan(0);
    for (const h of heights) expect(h).toBeGreaterThan(20);
  });

  test("reduced motion skips the intro", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator('[role="status"]')).toHaveCount(0, { timeout: 3_000 });
  });
});
