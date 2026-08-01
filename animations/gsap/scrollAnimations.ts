import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP Scroll Animation Presets
 *
 * Reusable ScrollTrigger configurations for section-level animations.
 * Each function returns a GSAP timeline or tween for cleanup via useGSAP.
 */

/**
 * Fade-up animation triggered on scroll.
 */
export function scrollFadeUp(
  elements: gsap.TweenTarget,
  trigger: string | Element,
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
): gsap.core.Tween {
  const { y = 40, duration = 0.8, stagger = 0.1, start = "top 85%" } = options;

  return gsap.from(elements, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none none",
    },
  });
}

/**
 * Parallax effect — element moves at different speed than scroll.
 */
export function scrollParallax(
  element: gsap.TweenTarget,
  trigger: string | Element,
  options: {
    speed?: number;
    start?: string;
    end?: string;
  } = {}
): gsap.core.Tween {
  const {
    speed = 0.3,
    start = "top bottom",
    end = "bottom top",
  } = options;

  return gsap.to(element, {
    y: () => speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  });
}

/**
 * Horizontal scroll section — pin and scroll sideways.
 */
export function scrollHorizontal(
  container: string | Element,
  panels: string | Element
): ScrollTrigger {
  const containerEl =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!containerEl) throw new Error("Container not found");

  const panelEls =
    typeof panels === "string"
      ? containerEl.querySelectorAll(panels)
      : [panels];

  const scrollWidth = (panelEls.length - 1) * 100;

  gsap.to(panelEls, {
    xPercent: -scrollWidth,
    ease: "none",
    scrollTrigger: {
      trigger: containerEl,
      pin: true,
      scrub: 1,
      end: () => "+=" + (containerEl as HTMLElement).offsetWidth,
    },
  });

  return ScrollTrigger.getAll().pop()!;
}

/**
 * Draw SVG line animation on scroll.
 */
export function scrollLineReveal(
  path: SVGPathElement,
  trigger: string | Element,
  options: {
    start?: string;
    end?: string;
  } = {}
): gsap.core.Tween {
  const { start = "top 80%", end = "bottom 20%" } = options;
  const length = path.getTotalLength();

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  return gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  });
}
