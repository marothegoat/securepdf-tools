import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecurePDF Tools — Private Browser-Based PDF Tools",
  description:
    "Merge, split, and protect PDFs entirely in your browser. No uploads. No accounts. No tracking. Your files never leave your device.",
  keywords: [
    "private PDF merger",
    "no-upload PDF splitter",
    "secure browser-based PDF tools",
    "password protect PDF free",
    "merge PDF without uploading",
  ],
  openGraph: {
    title: "SecurePDF Tools — Private Browser-Based PDF Tools",
    description:
      "Merge, split, and protect PDFs entirely in your browser. Files never leave your device.",
    type: "website",
    url: "https://securepdf-tools.netlify.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "SecurePDF Tools",
    description:
      "Private browser-based PDF tools. Merge, split, encrypt. Zero upload.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body style={{ margin: 0, padding: 0, backgroundColor: "#020617" }}>
        {children}
      </body>
    </html>
  );
}
