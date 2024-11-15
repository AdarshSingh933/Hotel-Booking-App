import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; // Import the Navbar
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Navbar appears on every page */}
        <main>{children}</main>
      </body>
    </html>
  );
}