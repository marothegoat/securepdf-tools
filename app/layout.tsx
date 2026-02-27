import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecurePDF Tools — Private Browser-Based PDF Tools",
  description:
    "Merge, split, and protect PDFs entirely in your browser. No uploads. No accounts. Files never leave your device.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
