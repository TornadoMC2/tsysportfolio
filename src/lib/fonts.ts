import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Shared across both route-group layouts. Declaring `next/font` loaders once
 * keeps a single preload/subset per family instead of one per document shell.
 */
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${inter.variable} ${jetbrainsMono.variable}`;
