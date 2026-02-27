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

4. Click **"Commit changes"** ✅

---

### Step 4 — Redeploy
**Netlify → Deploys → "Trigger deploy"**

---

## Your favicon will show in the browser tab like this:
```
🔒 SecurePDF Tools — Private Browser...
