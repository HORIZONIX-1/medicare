import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hope Medical Center",
  description: "A comprehensive medical center dedicated to providing exceptional healthcare services and promoting wellness in the community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ height: '100%' }}
    >
      <body className="root-body">
        <header className="header-main">
          <Header />
        </header>

        <main className="main-content">{children}</main>

        <footer className="footer">
          <div className="footer-content">© {new Date().getFullYear()} Project Hope</div>
        </footer>
      </body>
    </html>
  );
}
