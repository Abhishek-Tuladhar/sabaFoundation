import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
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
  metadataBase: new URL("https://sabafamilyfoundation.com"),

  title: {
    default: "Saba Family Foundation",
    template: "%s | Saba Family Foundation",
  },

  description:
    "Saba Family Foundation works to improve lives through education, healthcare, nutrition, livelihoods, arts and culture, and human rights initiatives.",

  applicationName: "Saba Family Foundation",

  keywords: [
    "Saba Family Foundation",
    "Saba Foundation",
    "philanthropy",
    "education",
    "healthcare",
    "human rights",
    "skill development",
    "livelihood",
    "arts and culture",
    "community development",
  ],

  authors: [
    {
      name: "Saba Family Foundation",
    },
  ],

  creator: "Saba Family Foundation",
  publisher: "Saba Family Foundation",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sabafamilyfoundation.com",
    siteName: "Saba Family Foundation",
    title: "Saba Family Foundation",
    description:
      "Creating opportunities and improving lives through education, healthcare, livelihoods, arts and culture, and human rights.",
  },

  twitter: {
    card: "summary",
    title: "Saba Family Foundation",
    description:
      "Creating opportunities and improving lives through education, healthcare, livelihoods, arts and culture, and human rights.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body bg-cream text-ink antialiased">
        <SmoothScroll />

        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
