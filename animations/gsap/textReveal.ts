import gsap from "gsap";

/**
 * GSAP Text Reveal Utilities
 *
 * Since GSAP SplitText is a premium plugin, we implement
 * character/word splitting manually with GSAP animations.
 */

/**
 * Split text element into individual spans for animation.
 * Call this before animating with GSAP.
 */
export function splitTextIntoChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || "";
  element.textContent = "";
  element.setAttribute("aria-label", text);

  const chars: HTMLSpanElement[] = [];

  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.setAttribute("aria-hidden", "true");
    element.appendChild(span);
    chars.push(span);
  });

  return chars;
}

/**
 * Split text into words for animation.
 */
export function splitTextIntoWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || "";
  element.textContent = "";
  element.setAttribute("aria-label", text);

  const words: HTMLSpanElement[] = [];

  text.split(" ").forEach((word, index, arr) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    wrapper.style.verticalAlign = "top";

    const inner = document.createElement("span");
    inner.textContent = word;
    inner.style.display = "inline-block";
    inner.style.willChange = "transform, opacity";
    inner.setAttribute("aria-hidden", "true");

    wrapper.appendChild(inner);
    element.appendChild(wrapper);

    // Add space between words (except last)
    if (index < arr.length - 1) {
      const space = document.createElement("span");
      space.textContent = "\u00A0";
      space.style.display = "inline-block";
      element.appendChild(space);
    }

    words.push(inner);
  });

  return words;
}

/**
 * Animate characters revealing from bottom with stagger.
 */
export function animateCharsReveal(
  chars: HTMLSpanElement[],
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  } = {}
): gsap.core.Timeline {
  const {
    duration = 0.8,
    stagger = 0.02,
    delay = 0,
    ease = "power3.out",
  } = options;

  const tl = gsap.timeline();

  tl.from(chars, {
    y: "100%",
    opacity: 0,
    rotateX: 90,
    duration,
    stagger,
    delay,
    ease,
  });

  return tl;
}

/**
 * Animate words revealing from bottom.
 */
export function animateWordsReveal(
  words: HTMLSpanElement[],
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  } = {}
): gsap.core.Timeline {
  const {
    duration = 0.7,
    stagger = 0.05,
    delay = 0,
    ease = "power3.out",
  } = options;

  const tl = gsap.timeline();

  tl.from(words, {
    y: "110%",
    duration,
    stagger,
    delay,
    ease,
  });

  return tl;
}
