import type { Metadata } from "next";
import "./globals.css";
import config from "@/config.json";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: config.siteTitle,
  description: "Explore AI agents powered by Hybrid Pillars",
  icons: {
    icon: [
      { url: "/hp_logo.png", type: "image/png" },
    ],
    shortcut: "/hp_logo.png",
    apple: "/hp_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="pt-8">
          {children}
        </div>
      </body>
    </html>
  );
}

