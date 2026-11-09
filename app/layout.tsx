import type { Metadata, Viewport } from "next";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/inter";
import "./globals.css";
import { AppProvider } from "@/lib/state";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "RoboSpark Academy — free online robotics school", template: "%s · RoboSpark Academy" },
  description:
    "Free, multilingual (EN · KZ · RU), self-paced robotics, CAD and programming courses for students in Kazakhstan. Learn at your own pace. Build beyond limits.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#701637" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <AppProvider>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
