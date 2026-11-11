export type Theme = "dark" | "light";

export const THEME_KEY = "theme";

/**
 * Inlined in <head> so the saved theme is applied before the first paint —
 * no flash of the wrong colours. Dark is the default identity.
 * `?theme=light` / `?theme=dark` in a link sets (and remembers) the theme.
 */
export const themeScript = `(function(){var d=document.documentElement;try{var q=new URLSearchParams(location.search).get("theme");if(q==="light"||q==="dark")localStorage.setItem("${THEME_KEY}",q);var t=localStorage.getItem("${THEME_KEY}");d.setAttribute("data-theme",t==="light"?"light":"dark");}catch(e){d.setAttribute("data-theme","dark");}})();`;
