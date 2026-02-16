import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OG Image Generator | buildera.dev",
  description: "Generate beautiful social preview images for your content in seconds. Free, open source, and easy to use.",
  openGraph: {
    title: "OG Image Generator",
    description: "Generate beautiful social preview images for your content in seconds",
    type: "website",
    url: "https://og.buildera.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "OG Image Generator",
    description: "Generate beautiful social preview images for your content in seconds",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
