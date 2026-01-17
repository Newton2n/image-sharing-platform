import { Sora } from "next/font/google";
import "./globals.css";
import { ReduxProvider, Header, Footer ,BottomNav} from "@/components/index";
import AppInitializer from "@/components/providers/app-initializer";
import { Analytics } from "@vercel/analytics/react";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});
export const metadata = {
  title: {
    default: "Postora",
    template: "%s | Postora",
  },
  description: "Image sharing platform to discover and share amazing images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable}  antialiased `}>
        <ReduxProvider>
          <AppInitializer>
            <Analytics />
            <Header />
            {children}
            {/* bottom navbar for mobile devices */}
            <BottomNav />
            <Footer />
          </AppInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
