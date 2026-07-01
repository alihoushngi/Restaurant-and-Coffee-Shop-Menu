import { defaultMetadata } from "@/utils/seo";
import type { Metadata } from "next";

import { FiraFont, VazirFont } from "@/app/font";
import RegisterSW from "@/components/layout/RegisterSW";
import ToastViewport from "@/components/ui/ToastViewport";
import "@/styles/globals.css";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${FiraFont.variable} ${VazirFont.variable} font-fa`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
        <link rel="icon" href="/icons/icon-192x192.png" />
      </head>
      <body style={{ backgroundColor: "#f6f0e8" }}>
        <RegisterSW />
        <ToastViewport />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
