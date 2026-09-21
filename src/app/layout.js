import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import Header from "@/components/Header/Header";
import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Saba Family Foundation",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body bg-cream text-ink antialiased">
        <SmoothScroll />
        <Header />
        {children}
      </body>
    </html>
  );
}