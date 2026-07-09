import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova Kicks — Premium Sneakers Engineered for Performance",
  description:
    "Discover Nova Kicks: premium sneakers crafted for performance and designed for life. Explore our collection of running, lifestyle, and sports footwear.",
  keywords: ["sneakers", "running shoes", "premium footwear", "Nova Kicks", "athletic shoes"],
  openGraph: {
    title: "Nova Kicks — Premium Sneakers",
    description: "Step into the future of footwear.",
    url: "https://novakicks.vercel.app",
    siteName: "Nova Kicks",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFA]`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
