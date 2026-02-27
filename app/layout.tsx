import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecurePDF Tools — Private Browser-Based PDF Tools",
  description: "Merge, split, and protect PDFs in your browser. Files never leave your device.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

6. Click **"Commit changes"** ✅
7. **Netlify → Trigger deploy**

---

## What Happened

When I showed you the example:
```
🔒 SecurePDF Tools — Private Browser...
