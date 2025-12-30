import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ReduxProvider, Header, Footer } from "@/components/index";
import AppInitializer from "@/components/providers/app-initializer";
import { Analytics } from "@vercel/analytics/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Postora",
  description: "Image sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  antialiased suppressHydrationWarning`}
      >
        <ReduxProvider>
          <AppInitializer>
            <Analytics />
            <Header />
            {children}
            <Footer />
          </AppInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
