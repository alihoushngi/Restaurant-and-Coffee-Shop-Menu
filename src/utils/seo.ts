import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: "رایو | منوی کافه",
  description:
    "منوی دیجیتال کافه رایو با قهوه، نوشیدنی سرد، کیک، صبحانه، دسر و غذاهای اصلی در یک تجربه موبایل‌محور و مدرن.",
  manifest: "/manifest.webmanifest",
  authors: [
    {
      name: "رایو",
      url: "https://rayo-menu.ir/",
    },
  ],
  keywords: [
    "کافه رایو",
    "منوی دیجیتال",
    "قهوه",
    "نوشیدنی سرد",
    "کیک",
    "صبحانه",
    "دسر",
    "رایو",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://rayo-menu.ir/",
    siteName: "رایو",
    title: "رایو | منوی کافه",
    description:
      "منوی دیجیتال کافه رایو با انتخابی از قهوه، نوشیدنی، کیک، صبحانه و دسرهای تازه.",
    images: [
      {
        url: "https://rayo-menu.ir/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "منوی دیجیتال کافه رایو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "رایو | منوی کافه",
    description:
      "منوی دیجیتال کافه رایو با انتخابی از قهوه، نوشیدنی، کیک، صبحانه و دسرهای تازه.",
    creator: "@rayo",
    images: ["https://rayo-menu.ir/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};
