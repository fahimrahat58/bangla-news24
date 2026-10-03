import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import NavLinks from "./components/navlinks";
import Footer from "./components/footer";
import Marquee from "./components/marquee";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const banglaFont = Noto_Sans_Bengali({
  variable: "--font-bangla",
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "Bangla News 24",
  description: "Next.js with Better Auth",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${banglaFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-(--font-bangla)">
        <Header/>
        <NavLinks/>
        <Marquee/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}