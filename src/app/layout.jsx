import {Sora} from "next/font/google";
import "./globals.css";

import { ReduxProvider, Header, Footer } from "@/components/index";
import AppInitializer from "@/components/providers/app-initializer";
import { Analytics } from "@vercel/analytics/react";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
})
export const metadata = {
  title: "Postora",
  description: "Image sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable}  antialiased `}
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
