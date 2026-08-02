import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { generateSiteMetadata } from "@/lib/metadata";
import LenisProvider from "@/providers/LenisProvider";
import AnimationProvider from "@/providers/AnimationProvider";
import Navigation from "@/components/layout/Navigation";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor from "@/components/layout/CustomCursor";
import CommandPalette from "@/components/shared/CommandPalette";
import DeveloperMode from "@/components/shared/DeveloperMode";
import Preloader from "@/components/shared/Preloader";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = generateSiteMetadata();

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <AnimationProvider>
          <LenisProvider>
            <Preloader>
              <ScrollProgress />
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
              <CustomCursor />
              <CommandPalette />
              <DeveloperMode />
              {/* Noise overlay for texture */}
              <div className="noise-overlay" aria-hidden="true" />
            </Preloader>
          </LenisProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}

