import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ori Developer Platform",
  description: "Developer control plane for Ori.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}