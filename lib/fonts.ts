import { Inter, Space_Grotesk, JetBrains_Mono, Alexandria, Lalezar } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/* Arabic — Lalezar for display headings (one heavy weight), Alexandria for text, UI and numbers */
export const lalezar = Lalezar({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-lalezar",
  display: "swap",
  preload: false,
});

export const alexandria = Alexandria({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-alexandria",
  display: "swap",
  preload: false,
});

/**
 * Combined font variable class string for the root element.
 */
export const fontVariables = `${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`;
export const arabicFontVariables = `${lalezar.variable} ${alexandria.variable}`;
