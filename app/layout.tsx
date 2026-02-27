import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecurePDF Tools — Private Browser-Based PDF Tools",
  description:
    "Merge, split, and protect PDFs entirely in your browser. No uploads. No accounts. Your files never leave your device.",
  keywords: [
    "private PDF merger",
    "no-upload PDF splitter",
    "secure browser-based PDF tools",
    "password protect PDF free",
  ],
  openGraph: {
    title: "SecurePDF Tools — Private Browser-Based PDF Tools",
    description: "Merge, split, and protect PDFs. Files never leave your device.",
    type: "website",
    url: "https://securepdftool.netlify.app",
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "CEjT5UenxidvOqnU1J63ejn7VrKZECYmgDBDFoxMJg4",
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
