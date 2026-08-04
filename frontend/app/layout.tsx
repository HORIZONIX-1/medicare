import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
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
      className={`${poppins.variable}`}
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
