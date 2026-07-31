import type { Metadata } from "next";
import { Bangers, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M2 CARTEL",
  description:
    "M2 Cartel — a currency-themed descent through the doctrine, the money supply, the crew, and the vault.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
