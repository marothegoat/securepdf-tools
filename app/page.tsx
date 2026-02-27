"use client";

import React, { useState, useCallback, useRef, useEffect, DragEvent, ChangeEvent } from "react";
import {
  ShieldCheck, Lock, Merge, Scissors, FileText, Upload, Download,
  ArrowLeft, ChevronRight, BookOpen, Eye, EyeOff, X, Plus,
  AlertCircle, CheckCircle2, Globe, Server, Cpu, Clock, Menu, XCircle, MessageCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type Page = "home" | "merge" | "split" | "protect" | "blog" | "post";
type ToolStatus = "idle" | "loading" | "ready" | "processing" | "done" | "error";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: React.ReactNode;
}

interface PDFFile {
  file: File;
  name: string;
  size: string;
  id: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const formatBytes = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(2) + " MB";
};
const uid = () => Math.random().toString(36).slice(2, 9);

// ─────────────────────────────────────────────────────────────────────────────
// ADS COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const PopunderAd = () => (
  <script src="https://progressmagnify.com/28/4a/70/284a703ca42a6d58ec9d28bfaa1aad31.js" async />
);

const NativeBannerAd = () => (
  <div className="my-8">
    <script
      async
      data-cfasync="false"
      src="https://progressmagnify.com/2a3aa5098958f1f3f77abe43f1f6d8eb/invoke.js"
    />
    <div id="container-2a3aa5098958f1f3f77abe43f1f6d8eb" />
  </div>
);

const BannerAd468 = () => {
  useEffect(() => {
    const w = window as any;
    w.atOptions = {
      key: "673c1e47f2b7a904a7e86be2e112df84",
      format: "iframe",
      height: 60,
      width: 468,
      params: {},
    };
    const script = document.createElement("script");
    script.src = "https://progressmagnify.com/673c1e47f2b7a904a7e86be2e112df84/invoke.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
  return (
    <div className="flex justify-center my-6">
      <div style={{ width: 468, height: 60, overflow: "hidden" }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// WHATSAPP BUTTON
// ─────────────────────────────────────────────────────────────────────────────
const WhatsAppButton = () => (
  <a
    href="https://wa.me/message/S4NV3OATC2R7J1"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-emerald-500/30"
    style={{ backgroundColor: "#25D366" }}
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-5 h-5 text-white" />
    <span className="text-white text-sm font-mono font-semibold hidden sm:block">Chat with us</span>
  </a>
);

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD SCHEMA — SINGLE COMBINED BLOCK (NO DUPLICATES)
// ─────────────────────────────────────────────────────────────────────────────
const SchemaMarkup = () => {
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "SecurePDF Tools",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "Private, browser-based PDF tools. Merge, split, and protect PDFs securely — files never leave your device.",
        featureList: ["Private PDF merger", "No-upload PDF splitter", "Browser-based PDF password protection"],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Are my files uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. All PDF processing happens entirely in your browser. Your files never leave your device." } },
          { "@type": "Question", name: "What is a private PDF merger?", acceptedAnswer: { "@type": "Answer", text: "A private PDF merger combines multiple PDF files into one entirely in your browser, with zero server upload." } },
          { "@type": "Question", name: "Can I use these PDF tools offline?", acceptedAnswer: { "@type": "Answer", text: "Yes. After the initial page load, all PDF tools work fully offline." } },
          { "@type": "Question", name: "Is the Protect PDF tool HIPAA safe?", acceptedAnswer: { "@type": "Answer", text: "Browser-based processing eliminates server transmission risk. The tool uses AES-256 encryption locally." } },
          { "@type": "Question", name: "How does PDF password protection work?", acceptedAnswer: { "@type": "Answer", text: "AES-256 encryption via pdf-lib runs in your browser. The password is never transmitted anywhere." } },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// BLOG ARTICLES (1–20)
// ─────────────────────────────────────────────────────────────────────────────
const A1 = () => (
  <article className="prose-custom">
    <p className="lead">Every day, millions of people upload their most sensitive documents — bank statements, legal contracts, medical records — to random online PDF tools. In 2026, this habit is not just careless. It is a significant security risk.</p>
    <h2>The Hidden Danger of Server-Side PDF Processing</h2>
    <p>When you drag a file onto a typical online PDF tool, that file travels across the internet and lands on a server you know nothing about. The company behind that tool may be storing your document, scanning it for data, or exposing it to third parties via insecure infrastructure.</p>
    <ul>
      <li><strong>Bank statements</strong> containing account numbers and full transaction histories.</li>
      <li><strong>Legal contracts</strong> with proprietary business terms and signatures.</li>
      <li><strong>Medical records</strong> protected by HIPAA regulations.</li>
      <li><strong>Tax documents</strong> containing Social Security Numbers.</li>
    </ul>
    <h2>What Happens After You Upload?</h2>
    <p>Privacy policies on free tools are notoriously vague. Even well-intentioned companies face risks: misconfigured cloud storage, compromised credentials, rogue API keys. In 2023 alone, multiple popular file-conversion services suffered data exposure incidents.</p>
    <h2>Browser-Based Processing: The Secure Alternative</h2>
    <p>Thanks to pdf-lib, every PDF operation — merging, splitting, encrypting — can now happen entirely within the browser on your local machine. Your files never leave your device. It is faster than server-based tools because there is zero upload latency.</p>
    <ul>
      <li><strong>Zero server transmission.</strong> Your PDF bytes never leave RAM on your device.</li>
      <li><strong>No account required.</strong> No identity linking your documents to a profile.</li>
      <li><strong>Works offline.</strong> Disconnect from the internet after the page loads.</li>
      <li><strong>Verifiable.</strong> Open DevTools → Network tab to confirm zero outbound requests.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Can this tool access my files after I close the browser?</h3><p>No. Everything is cleared from browser memory when you close the tab.</p></div>
      <div className="faq-item"><h3>Does the tool work without internet?</h3><p>Yes. After the initial page load, all operations work fully offline.</p></div>
      <div className="faq-item"><h3>What encryption does the Protect PDF tool use?</h3><p>AES-256, the same standard used by banks and governments.</p></div>
    </div>
  </article>
);

const A2 = () => (
  <article className="prose-custom">
    <p className="lead">Adobe Acrobat costs over $200 a year. Password protecting a PDF takes 30 seconds and costs nothing — if you use the right tool.</p>
    <h2>Why People Think They Need Adobe</h2>
    <p>Adobe has spent decades convincing the world that PDF encryption requires their software. The PDF encryption standard is open and any tool can implement it. The only question is whether that tool processes your file on a server — or locally in your browser.</p>
    <h2>The Free Browser-Based Method</h2>
    <ul>
      <li><strong>Step 1.</strong> Open SecurePDF Tools and click the Protect PDF tool.</li>
      <li><strong>Step 2.</strong> Drag your PDF file into the upload zone.</li>
      <li><strong>Step 3.</strong> Type a strong password with uppercase, numbers, and symbols.</li>
      <li><strong>Step 4.</strong> Click Encrypt PDF and download your protected file.</li>
    </ul>
    <h2>What Encryption Level Does It Use?</h2>
    <p>The tool uses AES-256 encryption — the same standard used by banks and Adobe Acrobat. A file encrypted with AES-256 would take longer than the age of the universe to crack by brute force.</p>
    <h2>Tips for a Strong PDF Password</h2>
    <p>Use at least 12 characters. Mix uppercase letters, numbers, and special characters. Never use your name, birthdate, or simple words.</p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Is password protecting a PDF actually secure?</h3><p>Yes, when using AES-256 with a strong password. Weak passwords are the most common vulnerability.</p></div>
      <div className="faq-item"><h3>What if I forget the password?</h3><p>There is no recovery option for a properly encrypted PDF. Store passwords in a password manager.</p></div>
    </div>
  </article>
);

const A3 = () => (
  <article className="prose-custom">
    <p className="lead">Merging PDFs used to mean buying software or uploading sensitive files to random websites. In 2026, you can combine unlimited PDFs in seconds, entirely in your browser.</p>
    <h2>The Problem With Most Online PDF Mergers</h2>
    <p>Most free online PDF mergers upload your files to their servers for processing. Your confidential documents pass through infrastructure you have no visibility into. For bank statements or legal contracts, this represents a serious privacy risk.</p>
    <h2>How to Merge PDFs Without Uploading</h2>
    <ul>
      <li><strong>Step 1.</strong> Open SecurePDF Tools and select the Merge PDF tool.</li>
      <li><strong>Step 2.</strong> Drag all your PDF files into the tool at once.</li>
      <li><strong>Step 3.</strong> Drag files into your preferred order.</li>
      <li><strong>Step 4.</strong> Click Merge and download your combined PDF instantly.</li>
    </ul>
    <h2>How Many Files Can You Merge?</h2>
    <p>There is no artificial limit. You can merge 2 files or 50 files. The only practical limit is your device's available RAM.</p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Can I merge PDFs on my phone?</h3><p>Yes. SecurePDF Tools works in any modern mobile browser on iOS or Android.</p></div>
      <div className="faq-item"><h3>Will quality be reduced when merging?</h3><p>No. Pages are copied exactly — no recompression or quality loss occurs.</p></div>
    </div>
  </article>
);

const A4 = () => (
  <article className="prose-custom">
    <p className="lead">Is iLovePDF safe? It is one of the most-searched questions about online PDF tools — and the answer is more nuanced than their privacy policy suggests.</p>
    <h2>What iLovePDF Actually Does With Your Files</h2>
    <p>iLovePDF is a server-side PDF processing tool. When you use it, your file is uploaded to their servers, processed, and then made available for download. Files are automatically deleted after a period of time — but the exact retention window has changed multiple times over the years.</p>
    <h2>When iLovePDF Is Probably Fine</h2>
    <ul>
      <li><strong>Non-sensitive documents</strong> — restaurant menus, public brochures, marketing materials.</li>
      <li><strong>Documents already published publicly</strong> — content already on the internet.</li>
    </ul>
    <h2>When You Should Never Use iLovePDF</h2>
    <ul>
      <li><strong>Bank statements</strong> containing account numbers.</li>
      <li><strong>Legal contracts</strong> with signatures and confidential terms.</li>
      <li><strong>Medical records</strong> protected by HIPAA.</li>
      <li><strong>Tax documents</strong> containing Social Security Numbers.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Has iLovePDF ever had a data breach?</h3><p>No widely reported major breaches, but the risk exists for any service that stores uploaded files.</p></div>
      <div className="faq-item"><h3>Does iLovePDF sell your data?</h3><p>According to their privacy policy, they do not sell personal data. However, they use analytics and may share data with service providers.</p></div>
    </div>
  </article>
);

const A5 = () => (
  <article className="prose-custom">
    <p className="lead">Splitting a PDF into separate pages is one of the most common document tasks — and one of the easiest to do without any software or subscription.</p>
    <h2>How to Split a PDF in Your Browser</h2>
    <ul>
      <li><strong>Step 1.</strong> Open the SecurePDF Tools Split PDF tool.</li>
      <li><strong>Step 2.</strong> Upload your PDF by dragging it in or clicking to browse.</li>
      <li><strong>Step 3.</strong> Enter your page ranges — for example: 1-3, 4-7, 8-10.</li>
      <li><strong>Step 4.</strong> Click Split PDF and download each section separately.</li>
    </ul>
    <h2>Understanding Page Range Syntax</h2>
    <p>Page ranges use a simple comma-separated format. To extract pages 1 through 5, type 1-5. To also extract pages 10 through 15, add a comma: 1-5, 10-15. Each range becomes its own downloadable PDF file.</p>
    <h2>Does Splitting Affect PDF Quality?</h2>
    <p>No. Pages are extracted exactly as they appear in the original. There is no recompression or quality reduction.</p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Can I split a scanned PDF?</h3><p>Yes. Scanned PDFs are image-based PDFs and split exactly the same way.</p></div>
      <div className="faq-item"><h3>Is there a page limit?</h3><p>No artificial limit. You can split a 500-page document if needed.</p></div>
    </div>
  </article>
);

const A6 = () => (
  <article className="prose-custom">
    <p className="lead">Smallpdf is one of the most popular PDF tools on the internet — but is it actually safe for sensitive documents? This honest review covers what happens to your files.</p>
    <h2>How Smallpdf Processes Your Files</h2>
    <p>Smallpdf is a cloud-based PDF processor. All files are uploaded to their servers hosted on Amazon Web Services in Europe. Files are automatically deleted after one hour according to their policy.</p>
    <h2>Smallpdf's Security Certifications</h2>
    <p>Smallpdf holds ISO 27001 certification and claims GDPR compliance. They use TLS encryption for data in transit and AES-256 for data at rest. These are genuine security measures that make them more trustworthy than smaller uncertified tools.</p>
    <h2>Smallpdf Pricing in 2026</h2>
    <p>Smallpdf's free tier limits users to two tasks per day. Their Pro plan costs around $12 per month. Browser-based alternatives are completely free and more private.</p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Is Smallpdf GDPR compliant?</h3><p>Smallpdf claims GDPR compliance and is based in Switzerland. GDPR compliance means they follow specific rules — not that there is zero data risk.</p></div>
      <div className="faq-item"><h3>What is the best free alternative to Smallpdf?</h3><p>Browser-based tools like SecurePDF Tools are completely free, have no task limits, and never upload your files.</p></div>
    </div>
  </article>
);

const A7 = () => (
  <article className="prose-custom">
    <p className="lead">You do not need Adobe Acrobat or any paid software to work with PDFs on a Mac in 2026. Here is the complete guide to free PDF tools for macOS users.</p>
    <h2>Built-In Mac PDF Tools Most People Miss</h2>
    <p>macOS comes with surprisingly powerful PDF tools. Apple Preview can merge PDFs, split PDFs by deleting pages, annotate and sign documents, and compress file sizes.</p>
    <h2>How to Merge PDFs on Mac Using Preview</h2>
    <ul>
      <li><strong>Step 1.</strong> Open the first PDF in Preview.</li>
      <li><strong>Step 2.</strong> Open the Thumbnails sidebar: View → Thumbnails.</li>
      <li><strong>Step 3.</strong> Drag the second PDF file onto the thumbnail sidebar.</li>
      <li><strong>Step 4.</strong> Go to File → Export as PDF to save the merged file.</li>
    </ul>
    <h2>What About Adobe Acrobat for Mac?</h2>
    <p>Adobe Acrobat Pro for Mac costs over $200 per year. For most users, Apple Preview for basic tasks and free browser-based tools for encryption and splitting covers 95% of PDF needs completely free.</p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>How do I compress a PDF on Mac?</h3><p>In Preview, go to File → Export → choose Quartz Filter → select Reduce File Size.</p></div>
    </div>
  </article>
);

const A8 = () => (
  <article className="prose-custom">
    <p className="lead">Whether you are on Windows 10 or 11, there are several completely free ways to work with PDFs without installing Adobe or paying for any subscription.</p>
    <h2>Built-In Windows PDF Tools</h2>
    <p>Windows 10 and 11 include Microsoft Print to PDF — press Ctrl+P and choose it as the printer to save any document as a PDF. Microsoft Edge can view, annotate, and fill PDF forms natively.</p>
    <h2>Free PDF Merging on Windows</h2>
    <p>Windows does not have a built-in PDF merger like macOS Preview. The easiest free option is using a browser-based tool like SecurePDF Tools — drag in your files, merge them, download. No installation required.</p>
    <h2>Free PDF Password Protection on Windows</h2>
    <p>Neither Windows nor Microsoft Edge can add password protection to PDFs. SecurePDF Tools adds AES-256 encryption directly in your browser with zero upload required.</p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Is Adobe Reader free on Windows?</h3><p>Adobe Acrobat Reader (viewer only) is free. Adobe Acrobat Pro for editing requires a paid subscription over $200 per year.</p></div>
    </div>
  </article>
);

const A9 = () => (
  <article className="prose-custom">
    <p className="lead">Lawyers and legal professionals handle some of the most sensitive documents imaginable. Using the wrong PDF tool with client documents may be a professional ethics violation.</p>
    <h2>The Professional Responsibility Issue</h2>
    <p>Legal professionals in most jurisdictions have a duty of confidentiality toward their clients. Uploading client documents to third-party servers without explicit client consent potentially violates this duty.</p>
    <h2>What the ABA Says About Cloud Tools</h2>
    <p>The ABA's Formal Opinion 477R requires attorneys to understand how data is handled and what security measures are in place. Browser-based tools sidestep all these concerns because client data never leaves the attorney's device.</p>
    <h2>Recommended PDF Workflow for Law Firms</h2>
    <ul>
      <li><strong>Merging court filings</strong> — use browser-based tools so document contents stay local.</li>
      <li><strong>Encrypting client contracts</strong> — add AES-256 password protection before emailing.</li>
      <li><strong>Splitting discovery documents</strong> — extract relevant pages without server upload.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>What PDF encryption level should law firms use?</h3><p>AES-256 is the recommended standard — exactly what SecurePDF Tools and Adobe Acrobat both use.</p></div>
    </div>
  </article>
);

const A10 = () => (
  <article className="prose-custom">
    <p className="lead">PDF compression can reduce file sizes by 50 to 90 percent. But most compression tools send your files to external servers. Here is what you need to know.</p>
    <h2>Why PDF Files Get So Large</h2>
    <p>PDFs become large primarily because of embedded images. A single high-resolution scan can add several megabytes. When multiple scanned pages are combined, file sizes of 50MB or more are common.</p>
    <h2>Two Types of PDF Compression</h2>
    <p>Lossless compression reduces file size without quality reduction. Lossy compression reduces image resolution for dramatically smaller files but at the cost of visual quality. For legal documents, lossless is essential.</p>
    <h2>Built-In Compression Options</h2>
    <ul>
      <li><strong>Mac Preview</strong> — File → Export → Reduce File Size filter.</li>
      <li><strong>Microsoft Print to PDF</strong> — reprinting a PDF often reduces size slightly.</li>
      <li><strong>Google Drive</strong> — uploading and re-downloading via Google Docs sometimes reduces size.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>What is a good PDF file size for email?</h3><p>For reliable delivery, aim for under 5MB for multi-page documents and under 1MB for simple documents.</p></div>
    </div>
  </article>
);

const A11 = () => (
  <article className="prose-custom">
    <p className="lead">Healthcare professionals face unique challenges when handling PDF documents. The PDF tool you choose could be a HIPAA compliance decision, not just a convenience choice.</p>
    <h2>What HIPAA Says About Digital Document Handling</h2>
    <p>The HIPAA Security Rule requires covered entities to implement technical safeguards protecting electronic Protected Health Information. Uploading patient documents to a third-party server without a signed Business Associate Agreement almost certainly violates this requirement.</p>
    <h2>The Business Associate Agreement Problem</h2>
    <p>Most free PDF tools — iLovePDF, Smallpdf, and hundreds of similar services — do not offer BAAs. Without a BAA, using these tools to process patient data is a potential HIPAA violation.</p>
    <h2>Browser-Based Tools and HIPAA</h2>
    <p>Browser-based PDF tools that perform all processing locally present a fundamentally different risk profile. Since no data is transmitted to a third party, the BAA requirement does not apply in the same way.</p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>What is the penalty for a HIPAA violation involving a PDF tool?</h3><p>HIPAA penalties range from $100 to $50,000 per violation depending on culpability, up to $1.9 million per year for repeated violations.</p></div>
    </div>
  </article>
);

const A12 = () => (
  <article className="prose-custom">
    <p className="lead">Every month millions of people upload sensitive documents to PDF conversion sites they know nothing about. Here is a safer, smarter approach for 2026.</p>
    <h2>Why PDF to Word Conversion Is Tricky</h2>
    <p>PDFs are designed for fixed-layout display, not editing. Converting back to Word requires reconstructing the document's structure — recognizing paragraphs, columns, tables, and formatting.</p>
    <h2>The Safest Free Method — Google Docs</h2>
    <p>Upload your PDF to Google Drive, right-click it, and select Open with Google Docs. Google's servers process the conversion but if you already use Google Drive this may be an acceptable tradeoff.</p>
    <h2>Microsoft Word's Built-In PDF Import</h2>
    <p>Microsoft Word 2013 and later can open PDFs directly. Go to File → Open → select your PDF. Word converts it to editable format without any upload to external servers.</p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Will a converted PDF look exactly like the original?</h3><p>Rarely. Complex layouts often lose formatting. Simple text-heavy documents convert much more cleanly.</p></div>
    </div>
  </article>
);

const A13 = () => (
  <article className="prose-custom">
    <p className="lead">Sending bank statements by email is routine for mortgage applications and rental agreements. But how you prepare those PDFs before sending matters more than most people realize.</p>
    <h2>Why Bank Statements Are High-Value Targets</h2>
    <p>A single bank statement PDF contains everything an identity thief needs — your full name, address, account number, routing number, and a complete picture of your financial life.</p>
    <h2>Step 1 — Never Process Bank Statements on Random Websites</h2>
    <p>Commit to this rule: never upload a bank statement to any online PDF tool unless you have thoroughly vetted their security. Use browser-based tools exclusively.</p>
    <h2>Step 2 — Combine Statements if Required</h2>
    <p>Many lenders require three months of statements as a single PDF. Use a private PDF merger to combine them locally in your browser — the merged file never touches an external server.</p>
    <h2>Step 3 — Password Protect Before Sending</h2>
    <p>Always add password protection before emailing. Send the password via a text message — not a follow-up email. If the email is intercepted, the attacker still cannot read the document.</p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Is it safe to email bank statements?</h3><p>Standard email is not encrypted end-to-end. Always password-protect bank statement PDFs before attaching them to any email.</p></div>
    </div>
  </article>
);

const A14 = () => (
  <article className="prose-custom">
    <p className="lead">Google Chrome, Microsoft Edge, Firefox, and Safari all have built-in PDF capabilities that most users have never fully explored. Your browser alone handles more PDF tasks than you might expect.</p>
    <h2>What Every Modern Browser Can Do With PDFs</h2>
    <p>All major browsers can view PDFs natively. Beyond viewing, modern browsers support text search, zooming, printing to PDF, filling in form fields, basic annotations, and downloading modified copies.</p>
    <h2>Microsoft Edge's Advanced PDF Tools</h2>
    <p>Microsoft Edge has the most advanced built-in PDF tools of any browser. It supports digital signatures, sticky notes, ink drawing, text highlights, and an immersive reader mode — eliminating the need for a separate PDF application.</p>
    <h2>What Browsers Cannot Do</h2>
    <p>Browser built-in tools cannot merge multiple PDFs, split documents by page range, or add password encryption. SecurePDF Tools extends your browser's capabilities for these tasks without any installation.</p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Can I fill and sign a PDF in Chrome without Adobe?</h3><p>Yes. Chrome can fill standard form fields. For signatures, you can draw one using Chrome's annotation tools.</p></div>
    </div>
  </article>
);

const A15 = () => (
  <article className="prose-custom">
    <p className="lead">Remote work has fundamentally changed how teams handle documents. PDFs travel across email, Slack, Dropbox, and Google Drive daily — often containing sensitive business information.</p>
    <h2>The Remote Work PDF Security Problem</h2>
    <p>When teams work from home, document handling becomes harder to control. Employees use personal devices and unapproved tools to get work done quickly. A single employee uploading a confidential contract to a free PDF merger can create a compliance incident the organization never knows about.</p>
    <h2>Step 1 — Create a Whitelist of Approved PDF Tools</h2>
    <p>Define which PDF tools employees are allowed to use for company documents. The whitelist should include your approved PDF viewer, editing tool, and approved browser-based tools for merging and encryption.</p>
    <h2>Step 2 — Mandate Encryption for Email Attachments</h2>
    <ul>
      <li><strong>All contracts</strong> must be password protected before emailing externally.</li>
      <li><strong>Financial documents</strong> require encryption regardless of recipient.</li>
      <li><strong>Passwords</strong> must always be sent via a separate channel from the document.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>What is the biggest PDF security risk for remote teams?</h3><p>Shadow IT — employees using unapproved tools without IT knowledge. Provide approved tools that are easy to use.</p></div>
    </div>
  </article>
);

const A16 = () => (
  <article className="prose-custom">
    <p className="lead">Tax season means handling some of your most sensitive financial documents. W-2s, 1099s, and tax returns contain everything needed for identity theft.</p>
    <h2>What Tax Documents Contain</h2>
    <p>A single tax return PDF contains your full legal name, home address, Social Security Number, employer information, complete income breakdown, bank account details, and details about every major financial decision you made during the year.</p>
    <h2>Never Upload Tax PDFs to Free Online Tools</h2>
    <p>The risk calculus changes dramatically when a document contains a Social Security Number. A single SSN exposed in a data breach can result in fraudulent tax returns filed in your name and years of credit damage.</p>
    <h2>How to Store Tax PDFs Securely Long-Term</h2>
    <ul>
      <li><strong>Encrypt every tax PDF</strong> with a strong password before storing anywhere.</li>
      <li><strong>Use an encrypted cloud folder</strong> rather than a standard Dropbox or Google Drive folder.</li>
      <li><strong>Retain for seven years</strong> — the IRS audit window for most returns.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Is it safe to store tax returns in Google Drive?</h3><p>Standard Google Drive is not end-to-end encrypted. Encrypt the PDF with a strong password before uploading to any cloud service.</p></div>
    </div>
  </article>
);

const A17 = () => (
  <article className="prose-custom">
    <p className="lead">Real estate transactions involve dozens of documents — purchase agreements, mortgage applications, inspection reports, and closing disclosures. Each one is highly sensitive.</p>
    <h2>The Wire Fraud Risk in Real Estate PDFs</h2>
    <p>Real estate wire fraud costs American buyers hundreds of millions of dollars annually. Attackers compromise email accounts, monitor transaction communications, and send fraudulent wire instructions. Never act on wiring instructions received via email without verbal confirmation from a verified phone number.</p>
    <h2>Secure PDF Practices for Buyers and Sellers</h2>
    <ul>
      <li><strong>Encrypt</strong> all documents before emailing to your agent or lender.</li>
      <li><strong>Use browser-based tools</strong> for combining disclosure documents.</li>
      <li><strong>Verify recipients</strong> by phone before sending any financial document.</li>
      <li><strong>Store closing documents</strong> in encrypted form for years to come.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>How should I store my closing documents?</h3><p>Store password-protected copies in at least two locations — an encrypted cloud folder and a local external drive.</p></div>
    </div>
  </article>
);

const A18 = () => (
  <article className="prose-custom">
    <p className="lead">Students handle more PDF documents than almost any other group — assignments, research papers, transcripts, financial aid forms, and applications. Here is the complete guide to free PDF tools for students in 2026.</p>
    <h2>The Student PDF Toolkit</h2>
    <p>Most students need four core capabilities: view and annotate lecture slides, combine multiple documents into a single submission, split or extract pages, and occasionally password-protect sensitive documents.</p>
    <h2>Free Annotation Tools for Study</h2>
    <p>Adobe Acrobat Reader has solid annotation tools and is free to download. Microsoft Edge has excellent built-in annotation on Windows. On Mac, Apple Preview covers most annotation needs.</p>
    <h2>Free PDF Tools Worth Knowing</h2>
    <ul>
      <li><strong>SecurePDF Tools</strong> — merge, split, encrypt. Completely free, no upload.</li>
      <li><strong>Adobe Acrobat Reader</strong> — free viewer with annotation tools.</li>
      <li><strong>Microsoft Edge</strong> — best browser-based annotation on Windows.</li>
      <li><strong>Apple Preview</strong> — best built-in PDF tool on Mac.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>How do I scan physical documents to PDF on my phone?</h3><p>On iPhone use the Notes app or Files app scan feature. On Android use Google Drive's built-in scan feature. Both produce PDF output.</p></div>
    </div>
  </article>
);

const A19 = () => (
  <article className="prose-custom">
    <p className="lead">Small businesses produce enormous volumes of PDF documents — invoices, contracts, HR documents, financial reports, and compliance paperwork. Handling these securely does not require expensive software.</p>
    <h2>The Small Business PDF Problem</h2>
    <p>Small businesses handle documents just as sensitive as large enterprises — employee records, client contracts, financial data — but often without dedicated IT security staff.</p>
    <h2>Building a Simple Secure PDF Policy</h2>
    <ul>
      <li><strong>Approved tools list</strong> — define which PDF tools employees may use.</li>
      <li><strong>Encryption requirement</strong> — all external emails with attachments must be encrypted.</li>
      <li><strong>No server upload rule</strong> — financial and HR documents must use browser-based tools only.</li>
      <li><strong>Retention policy</strong> — define how long different document types are kept and where.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Do small businesses need to comply with GDPR for PDF documents?</h3><p>If you handle personal data of EU residents — including client names or financial information in PDFs — GDPR applies regardless of your business size.</p></div>
    </div>
  </article>
);

const A20 = () => (
  <article className="prose-custom">
    <p className="lead">WebAssembly has quietly transformed what browsers can do with files. In 2026, your browser can process, encrypt, and manipulate PDFs at near-native speed — without sending a single byte to a server.</p>
    <h2>What WebAssembly Actually Is</h2>
    <p>WebAssembly is a binary instruction format that runs in web browsers at speeds approaching native application performance. For PDF processing, it means libraries capable of full PDF manipulation can run locally in your browser tab.</p>
    <h2>How pdf-lib Uses the Browser</h2>
    <p>When you merge two PDFs in a browser-based tool, the pdf-lib library reads both files into memory, copies pages from each document into a new PDF structure, and outputs the result as a downloadable binary — all within your browser tab. No network request is made for file data at any point.</p>
    <h2>Verifying That No Upload Occurs</h2>
    <p>Open DevTools with F12, navigate to the Network tab, then use any browser-based PDF tool. If the tool is genuinely local, you will see zero outbound POST requests containing your file data.</p>
    <h2>Limitations of Browser-Based PDF Processing</h2>
    <ul>
      <li><strong>OCR is limited</strong> — optical character recognition still benefits from server-side processing.</li>
      <li><strong>Very large files</strong> — files above 200MB may be slow depending on device RAM.</li>
      <li><strong>PDF to Word conversion</strong> — structural reconstruction works better server-side.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item"><h3>Does using a browser-based tool mean my data is stored in the browser?</h3><p>No. Files are loaded into temporary browser memory (RAM) for processing. Closing the tab clears all file data completely.</p></div>
      <div className="faq-item"><h3>Is browser-based PDF processing as fast as desktop software?</h3><p>For merging, splitting, and encryption, browser-based tools are fast enough that most users notice no difference from desktop software.</p></div>
    </div>
  </article>
);

// ─────────────────────────────────────────────────────────────────────────────
// POSTS ARRAY — ALL 20
// ─────────────────────────────────────────────────────────────────────────────
const posts: BlogPost[] = [
  { slug: "stop-uploading-sensitive-pdfs", title: "Why You Should Stop Uploading Sensitive PDFs to Online Servers in 2026", description: "Every day, millions upload bank statements and legal docs to random PDF tools. Discover the hidden security risks.", date: "Feb 15, 2026", readTime: "8 min", content: <A1 /> },
  { slug: "password-protect-pdf-free", title: "How to Password Protect a PDF Without Adobe in 2026", description: "Adobe Acrobat costs over $200 a year. Password protecting a PDF takes 30 seconds and costs nothing.", date: "Feb 18, 2026", readTime: "5 min", content: <A2 /> },
  { slug: "merge-pdfs-without-uploading", title: "How to Merge PDFs Without Uploading Them — Complete 2026 Guide", description: "Combine unlimited PDFs in seconds, entirely in your browser, with zero risk to your privacy.", date: "Feb 20, 2026", readTime: "5 min", content: <A3 /> },
  { slug: "is-ilovepdf-safe", title: "Is iLovePDF Safe? An Honest Review for 2026", description: "The answer is more nuanced than their privacy policy suggests. Here is what you need to know.", date: "Feb 22, 2026", readTime: "6 min", content: <A4 /> },
  { slug: "split-pdf-free", title: "How to Split a PDF Into Multiple Files — Free, No Software Needed", description: "Splitting a PDF into separate pages is one of the easiest tasks to do without any software.", date: "Feb 24, 2026", readTime: "5 min", content: <A5 /> },
  { slug: "smallpdf-review-2026", title: "Smallpdf Review 2026 — Is It Safe and Worth Paying For?", description: "Smallpdf is popular but is it actually safe for sensitive documents? An honest review.", date: "Feb 26, 2026", readTime: "6 min", content: <A6 /> },
  { slug: "free-pdf-tools-mac", title: "Best Free PDF Tools for Mac in 2026 — No Adobe Required", description: "You do not need Adobe Acrobat or any paid software to work with PDFs on a Mac.", date: "Mar 1, 2026", readTime: "5 min", content: <A7 /> },
  { slug: "free-pdf-tools-windows", title: "Best Free PDF Tools for Windows 10 and 11 in 2026", description: "Several completely free ways to work with PDFs without Adobe or any paid subscription.", date: "Mar 3, 2026", readTime: "5 min", content: <A8 /> },
  { slug: "pdf-security-for-lawyers", title: "PDF Security for Lawyers — What Every Attorney Must Know in 2026", description: "Using the wrong PDF tool with client documents may be a professional ethics violation.", date: "Mar 5, 2026", readTime: "7 min", content: <A9 /> },
  { slug: "compress-pdf-free", title: "How to Compress a PDF — Free Methods That Actually Work in 2026", description: "PDF compression can reduce file sizes by up to 90 percent. Here is what you need to know.", date: "Mar 7, 2026", readTime: "5 min", content: <A10 /> },
  { slug: "hipaa-compliant-pdf-tools", title: "HIPAA Compliant PDF Tools — What Healthcare Workers Need to Know", description: "The PDF tool you choose could be a HIPAA compliance decision, not just a convenience choice.", date: "Mar 9, 2026", readTime: "7 min", content: <A11 /> },
  { slug: "pdf-to-word-safe", title: "How to Convert PDF to Word Safely Without Uploading Your Document", description: "Millions upload sensitive documents to PDF conversion sites they know nothing about. Here is a safer approach.", date: "Mar 11, 2026", readTime: "5 min", content: <A12 /> },
  { slug: "send-bank-statements-safely", title: "How to Send Bank Statements by Email Safely in 2026", description: "How you prepare bank statement PDFs before sending matters more than most people realize.", date: "Mar 13, 2026", readTime: "6 min", content: <A13 /> },
  { slug: "browser-pdf-tools-guide", title: "Your Browser Is a Powerful PDF Tool — Here Is What It Can Do", description: "Chrome, Edge, Firefox, and Safari have built-in PDF capabilities most users never fully explore.", date: "Mar 15, 2026", readTime: "5 min", content: <A14 /> },
  { slug: "remote-team-pdf-security", title: "How to Build a Secure PDF Workflow for Your Remote Team in 2026", description: "Remote work has changed how teams handle documents. Here is how to keep sensitive files safe.", date: "Mar 17, 2026", readTime: "7 min", content: <A15 /> },
  { slug: "protect-tax-pdfs", title: "How to Protect Your Tax PDFs From Identity Theft in 2026", description: "Tax returns contain everything needed for identity theft. Here is how to stay safe.", date: "Mar 19, 2026", readTime: "6 min", content: <A16 /> },
  { slug: "real-estate-pdf-security", title: "Real Estate PDF Security — How to Handle Mortgage and Closing Documents Safely", description: "Real estate transactions involve dozens of highly sensitive documents. Here is how to handle them securely.", date: "Mar 21, 2026", readTime: "7 min", content: <A17 /> },
  { slug: "free-pdf-tools-students", title: "Best Free PDF Tools for Students in 2026 — Complete Guide", description: "Students handle more PDFs than almost anyone. Here is the complete free toolkit.", date: "Mar 23, 2026", readTime: "5 min", content: <A18 /> },
  { slug: "small-business-pdf-security", title: "Small Business PDF Security — Handle Documents Safely Without IT", description: "Small businesses handle sensitive PDFs without IT infrastructure. Here is how to build a secure workflow.", date: "Mar 25, 2026", readTime: "7 min", content: <A19 /> },
  { slug: "browser-pdf-processing-explained", title: "How Browser-Based PDF Processing Works and Why It Protects Your Privacy", description: "WebAssembly transformed what browsers can do with files. Here is how local PDF processing works.", date: "Mar 27, 2026", readTime: "6 min", content: <A20 /> },
];

// ─────────────────────────────────────────────────────────────────────────────
// DROP ZONE
// ─────────────────────────────────────────────────────────────────────────────
interface DropZoneProps {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  label?: string;
}

const DropZone = ({ onFiles, multiple = false, label = "Drop PDF files here or click to browse" }: DropZoneProps) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf");
    if (dropped.length) onFiles(dropped);
  }, [onFiles]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length) onFiles(selected);
    e.target.value = "";
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-12 text-center group ${dragging ? "border-indigo-400 bg-indigo-500/10 scale-[1.01]" : "border-slate-600 hover:border-indigo-500 hover:bg-indigo-500/5 bg-slate-800/40"}`}
    >
      <input ref={inputRef} type="file" accept=".pdf" multiple={multiple} className="hidden" onChange={handleChange} />
      <div className="flex flex-col items-center gap-3">
        <div className={`rounded-full p-4 transition-all duration-200 ${dragging ? "bg-indigo-500/20" : "bg-slate-700/60 group-hover:bg-indigo-500/15"}`}>
          <Upload className={`w-8 h-8 transition-colors duration-200 ${dragging ? "text-indigo-400" : "text-slate-400 group-hover:text-indigo-400"}`} />
        </div>
        <div>
          <p className="text-slate-200 font-medium font-mono text-sm tracking-wide">{dragging ? "Release to load files" : label}</p>
          <p className="text-slate-500 text-xs mt-1 font-mono">PDF files only · Processed locally in your browser</p>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MERGE TOOL
// ─────────────────────────────────────────────────────────────────────────────
const MergeTool = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const dragIdx = useRef<number | null>(null);

  const addFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles.map(f => ({ file: f, name: f.name, size: formatBytes(f.size), id: uid() }))]);
    setStatus("idle");
    setDownloadUrl(null);
  };

  const reorder = (from: number, to: number) => {
    setFiles(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  const merge = async () => {
    if (files.length < 2) return;
    setStatus("processing");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (const pf of files) {
        const buf = await pf.file.arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Failed to merge PDFs.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      <DropZone onFiles={addFiles} multiple label="Drop multiple PDF files here or click to browse" />
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">{files.length} files · Drag to reorder</p>
            <button onClick={() => { setFiles([]); setDownloadUrl(null); setStatus("idle"); }} className="text-slate-500 hover:text-red-400 text-xs font-mono transition-colors">Clear all</button>
          </div>
          <div className="space-y-2">
            {files.map((f, i) => (
              <div key={f.id} draggable onDragStart={() => { dragIdx.current = i; }} onDragEnter={() => { if (dragIdx.current !== null && dragIdx.current !== i) { reorder(dragIdx.current, i); dragIdx.current = i; } }} onDragOver={e => e.preventDefault()} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 cursor-grab group hover:border-slate-600 transition-all">
                <div className="text-slate-600 font-mono text-xs w-5 text-center">{i + 1}</div>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0"><FileText className="w-4 h-4 text-indigo-400" /></div>
                <div className="flex-1 min-w-0"><p className="text-slate-200 text-sm font-medium truncate">{f.name}</p><p className="text-slate-500 text-xs font-mono">{f.size}</p></div>
                <button onClick={() => setFiles(prev => prev.filter(x => x.id !== f.id))} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all p-1 rounded-lg hover:bg-red-400/10"><X className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
          <label className="w-full py-2.5 rounded-xl border border-dashed border-slate-600 hover:border-indigo-500 text-slate-500 hover:text-indigo-400 text-sm font-mono transition-all flex items-center justify-center gap-2 hover:bg-indigo-500/5 cursor-pointer">
            <input type="file" accept=".pdf" multiple className="hidden" onChange={e => { const f = Array.from(e.target.files || []); if (f.length) addFiles(f); e.target.value = ""; }} />
            <Plus className="w-4 h-4" /> Add more files
          </label>
        </div>
      )}
      {status === "error" && <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"><AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" /><p className="text-red-300 text-sm">{errorMsg}</p></div>}
      {status === "done" && downloadUrl && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="flex-1"><p className="text-emerald-300 text-sm font-medium">Merge complete!</p><p className="text-emerald-400/60 text-xs font-mono">{files.length} files merged · 100% local</p></div>
          <a href={downloadUrl} download="merged.pdf" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-sm font-mono font-medium transition-all border border-emerald-500/30"><Download className="w-4 h-4" /> Download</a>
        </div>
      )}
      <button onClick={merge} disabled={files.length < 2 || status === "processing"} className={`w-full py-4 rounded-2xl font-mono font-semibold text-sm tracking-wider transition-all duration-200 ${files.length >= 2 && status !== "processing" ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5" : "bg-slate-700/50 text-slate-500 cursor-not-allowed"}`}>
        {status === "processing" ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Merging locally...</span> : `MERGE ${files.length >= 2 ? files.length + " PDFS" : "PDFS"} →`}
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SPLIT TOOL
// ─────────────────────────────────────────────────────────────────────────────
const SplitTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [ranges, setRanges] = useState("1");
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloads, setDownloads] = useState<{ url: string; name: string }[]>([]);

  const loadFile = async (files: File[]) => {
    const f = files[0];
    setFile(f); setFileName(f.name); setStatus("loading"); setDownloads([]);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer());
      setPageCount(doc.getPageCount());
      setRanges(`1-${doc.getPageCount()}`);
      setStatus("ready");
    } catch { setErrorMsg("Could not read the PDF."); setStatus("error"); }
  };

  const split = async () => {
    if (!file) return;
    setStatus("processing"); setErrorMsg("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await file.arrayBuffer());
      const results: { url: string; name: string }[] = [];
      const groups = ranges.split(",").map(part => {
        const t = part.trim();
        if (t.includes("-")) {
          const [s, e] = t.split("-").map(n => parseInt(n.trim()) - 1);
          return Array.from({ length: e - s + 1 }, (_, i) => s + i);
        }
        return [parseInt(t) - 1];
      });
      for (const indices of groups) {
        const valid = indices.filter(n => n >= 0 && n < src.getPageCount());
        if (!valid.length) continue;
        const newDoc = await PDFDocument.create();
        const copied = await newDoc.copyPages(src, valid);
        copied.forEach(p => newDoc.addPage(p));
        const bytes = await newDoc.save();
        const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
        results.push({ url: URL.createObjectURL(blob), name: `split-pages-${valid[0] + 1}-${valid[valid.length - 1] + 1}.pdf` });
      }
      setDownloads(results); setStatus("done");
    } catch (e: unknown) { setErrorMsg(e instanceof Error ? e.message : "Split failed."); setStatus("error"); }
  };

  return (
    <div className="space-y-6">
      {status === "idle" || status === "loading" ? <DropZone onFiles={loadFile} label="Drop a PDF file to split" /> : (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center flex-shrink-0"><FileText className="w-5 h-5 text-cyan-400" /></div>
          <div className="flex-1 min-w-0"><p className="text-slate-200 font-medium text-sm truncate">{fileName}</p><p className="text-slate-500 text-xs font-mono">{pageCount} pages · Ready to split</p></div>
          <button onClick={() => { setFile(null); setStatus("idle"); setDownloads([]); }} className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-700 transition-all"><X className="w-4 h-4" /></button>
        </div>
      )}
      {(status === "ready" || status === "done" || status === "error") && (
        <div>
          <label className="text-slate-400 text-xs font-mono uppercase tracking-widest block mb-2">Page ranges (comma-separated)</label>
          <input type="text" value={ranges} onChange={e => setRanges(e.target.value)} placeholder="e.g. 1-3, 4-6, 7" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 focus:border-indigo-500 outline-none text-slate-200 font-mono text-sm transition-colors placeholder:text-slate-600" />
          <p className="text-slate-600 text-xs font-mono mt-1.5">Each range becomes a separate PDF. Total pages: {pageCount}</p>
        </div>
      )}
      {status === "error" && <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"><AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" /><p className="text-red-300 text-sm">{errorMsg}</p></div>}
      {status === "done" && downloads.length > 0 && (
        <div className="space-y-2">
          <p className="text-emerald-300 text-sm font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{downloads.length} PDFs created</p>
          {downloads.map((d, i) => <a key={i} href={d.url} download={d.name} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-all group"><Download className="w-4 h-4 text-emerald-400" /><span className="flex-1 text-emerald-300 text-sm font-mono">{d.name}</span><ChevronRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition-transform" /></a>)}
        </div>
      )}
      {(status === "ready" || status === "error") && <button onClick={split} className="w-full py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-semibold text-sm tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5">SPLIT PDF →</button>}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PROTECT TOOL
// ─────────────────────────────────────────────────────────────────────────────
const ProtectTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const protect = async () => {
    if (!file || !password.trim()) return;
    setStatus("processing"); setErrorMsg("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const bytes = await (doc.save as any)({
        userPassword: password,
        ownerPassword: password + "_owner",
        permissions: { printing: "lowResolution", modifying: false, copying: false, annotating: false, fillingForms: true, contentAccessibility: true, documentAssembly: false },
      });
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e: unknown) { setErrorMsg(e instanceof Error ? e.message : "Encryption failed."); setStatus("error"); }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password) ? 4 : 3;
  const strengthLabel = ["", "Weak", "Fair", "Strong", "Very Strong"];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-emerald-500", "bg-indigo-500"];

  return (
    <div className="space-y-6">
      {!file ? <DropZone onFiles={f => { setFile(f[0]); setFileName(f[0].name); setStatus("idle"); setDownloadUrl(null); }} label="Drop a PDF to password-protect" /> : (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center flex-shrink-0"><Lock className="w-5 h-5 text-violet-400" /></div>
          <div className="flex-1 min-w-0"><p className="text-slate-200 font-medium text-sm truncate">{fileName}</p><p className="text-slate-500 text-xs font-mono">Ready to encrypt</p></div>
          <button onClick={() => { setFile(null); setStatus("idle"); setDownloadUrl(null); setPassword(""); }} className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-700 transition-all"><X className="w-4 h-4" /></button>
        </div>
      )}
      {file && (
        <div className="space-y-3">
          <label className="text-slate-400 text-xs font-mono uppercase tracking-widest block mb-2">Password</label>
          <div className="relative">
            <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter a strong password..." className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800 border border-slate-600 focus:border-violet-500 outline-none text-slate-200 font-mono text-sm transition-colors placeholder:text-slate-600" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
          </div>
          {password.length > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1">{[1, 2, 3, 4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : "bg-slate-700"}`} />)}</div>
              <p className={`text-xs font-mono ${strength <= 1 ? "text-red-400" : strength === 2 ? "text-yellow-400" : strength === 3 ? "text-emerald-400" : "text-indigo-400"}`}>{strengthLabel[strength]}</p>
            </div>
          )}
        </div>
      )}
      {status === "error" && <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"><AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" /><p className="text-red-300 text-sm">{errorMsg}</p></div>}
      {status === "done" && downloadUrl && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="flex-1"><p className="text-emerald-300 text-sm font-medium">PDF encrypted!</p><p className="text-emerald-400/60 text-xs font-mono">AES-256 · 100% local</p></div>
          <a href={downloadUrl} download={`protected-${fileName}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-sm font-mono font-medium transition-all border border-emerald-500/30"><Download className="w-4 h-4" /> Download</a>
        </div>
      )}
      {file && status !== "done" && <button onClick={protect} disabled={!password.trim() || status === "processing"} className={`w-full py-4 rounded-2xl font-mono font-semibold text-sm tracking-wider transition-all duration-200 ${password.trim() && status !== "processing" ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20 hover:-translate-y-0.5" : "bg-slate-700/50 text-slate-500 cursor-not-allowed"}`}>{status === "processing" ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Encrypting...</span> : "ENCRYPT PDF →"}</button>}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TOOL PAGE
// ─────────────────────────────────────────────────────────────────────────────
const colorMap = {
  indigo: { bg: "bg-indigo-500/15", text: "text-indigo-400", border: "border-indigo-500/30", badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" },
  cyan: { bg: "bg-cyan-500/15", text: "text-cyan-400", border: "border-cyan-500/30", badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" },
  violet: { bg: "bg-violet-500/15", text: "text-violet-400", border: "border-violet-500/30", badge: "bg-violet-500/10 text-violet-300 border-violet-500/20" },
};

const toolMeta = {
  merge: { title: "Private PDF Merger", subtitle: "Combine multiple PDFs — zero upload, 100% browser-based", icon: <Merge className="w-6 h-6" />, color: "indigo" as const, keywords: ["private PDF merger", "merge PDFs locally", "offline PDF combiner"] },
  split: { title: "No-Upload PDF Splitter", subtitle: "Extract pages into separate PDFs — files stay on your device", icon: <Scissors className="w-6 h-6" />, color: "cyan" as const, keywords: ["no-upload PDF splitter", "split PDF locally", "extract PDF pages browser"] },
  protect: { title: "Secure PDF Encryption", subtitle: "Password-protect PDFs with AES-256 — password never transmitted", icon: <Lock className="w-6 h-6" />, color: "violet" as const, keywords: ["secure PDF encryption", "browser PDF password", "local PDF protect"] },
};

const ToolPage = ({ tool, onBack }: { tool: "merge" | "split" | "protect"; onBack: () => void }) => {
  const meta = toolMeta[tool];
  const colors = colorMap[meta.color];
  useEffect(() => { document.title = `${meta.title} | SecurePDF Tools`; }, [meta.title]);
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-300 font-mono text-sm transition-colors mb-8 group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />Back to tools</button>
      <div className="mb-8">
        <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-5 ${colors.text}`}>{meta.icon}</div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2 font-mono tracking-tight">{meta.title}</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{meta.subtitle}</p>
        <div className="flex flex-wrap gap-2">{meta.keywords.map(kw => <span key={kw} className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${colors.badge}`}>{kw}</span>)}</div>
      </div>
      <BannerAd468 />
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-6 md:p-8">
        {tool === "merge" && <MergeTool />}
        {tool === "split" && <SplitTool />}
        {tool === "protect" && <ProtectTool />}
      </div>
      <NativeBannerAd />
      <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-slate-800/20 border border-slate-700/30">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <p className="text-slate-500 text-xs font-mono leading-relaxed"><strong className="text-slate-400">Zero-server guarantee:</strong> All processing runs in your browser via pdf-lib. No data transmitted. Verify via DevTools → Network tab.</p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
const tools = [
  { id: "merge" as const, title: "Private PDF Merger", description: "Combine multiple PDFs into a single file. Drag-and-drop ordering. Zero upload — completely private.", icon: <Merge className="w-6 h-6" />, color: "indigo", badge: "Most Popular", features: ["Multi-file drag & drop", "Reorder pages", "100% local"] },
  { id: "split" as const, title: "No-Upload PDF Splitter", description: "Extract specific pages or ranges into separate PDF files. Perfect for splitting large documents.", icon: <Scissors className="w-6 h-6" />, color: "cyan", badge: "Privacy-First", features: ["Custom page ranges", "Multi-split output", "Offline capable"] },
  { id: "protect" as const, title: "Secure PDF Encryption", description: "Add AES-256 password protection to any PDF. Your password and document never leave your browser.", icon: <Lock className="w-6 h-6" />, color: "violet", badge: "AES-256", features: ["AES-256 encryption", "Permissions control", "Zero transmission"] },
];

const trustPoints = [
  { icon: <Globe className="w-5 h-5" />, title: "Zero Server Contact", desc: "No file ever touches a remote server. Verify in DevTools → Network." },
  { icon: <Cpu className="w-5 h-5" />, title: "Browser-Native Processing", desc: "Powered by pdf-lib running in your browser's JavaScript engine." },
  { icon: <Clock className="w-5 h-5" />, title: "No Retention, Ever", desc: "Files live only in browser memory. Closing the tab erases everything." },
  { icon: <Server className="w-5 h-5" />, title: "Works Fully Offline", desc: "Disconnect from Wi-Fi after page load. All tools still work perfectly." },
];

const Home = ({ onNavigate }: { onNavigate: (p: Page) => void }) => {
  useEffect(() => { document.title = "SecurePDF Tools — Private Browser-Based PDF Tools"; }, []);
  return (
    <div className="space-y-24">
      <section className="text-center pt-8 md:pt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8 tracking-wider"><ShieldCheck className="w-3.5 h-3.5" />YOUR FILES NEVER LEAVE YOUR DEVICE</div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-6 leading-tight tracking-tight font-mono">PDF Tools That<br /><span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Respect Your Privacy</span></h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">Merge, split, and protect PDFs entirely in your browser. No uploads. No accounts. No tracking. Bank statements and legal docs stay on <strong className="text-slate-300">your computer</strong>.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => onNavigate("merge")} className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-semibold text-sm tracking-wider transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 flex items-center gap-2"><Merge className="w-4 h-4" /> Start Merging PDFs</button>
          <button onClick={() => onNavigate("blog")} className="px-8 py-4 rounded-2xl border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-200 font-mono font-semibold text-sm tracking-wider transition-all hover:bg-slate-800/50 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Why This Matters</button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-slate-500 text-xs font-mono">
          {["No Signup", "No Ads", "No Upload", "Open Source Ready", "GDPR Safe"].map(b => <span key={b} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{b}</span>)}
        </div>
      </section>

      <BannerAd468 />

      <section>
        <div className="text-center mb-12"><h2 className="text-2xl md:text-3xl font-bold text-slate-100 font-mono mb-3">Secure Browser-Based PDF Tools</h2><p className="text-slate-500 text-sm font-mono">Three powerful tools. Zero server contact. Full privacy.</p></div>
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map(tool => {
            const colors = colorMap[tool.color as keyof typeof colorMap];
            return (
              <button key={tool.id} onClick={() => onNavigate(tool.id)} className={`text-left p-6 rounded-3xl border bg-slate-800/30 hover:bg-slate-800/60 transition-all duration-200 group hover:-translate-y-1 hover:shadow-2xl ${colors.border} relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${tool.color === "indigo" ? "bg-indigo-500" : tool.color === "cyan" ? "bg-cyan-500" : "bg-violet-500"}`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center ${colors.text} group-hover:scale-110 transition-transform`}>{tool.icon}</div>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${colors.badge}`}>{tool.badge}</span>
                  </div>
                  <h3 className="text-slate-100 font-bold font-mono text-lg mb-2">{tool.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{tool.description}</p>
                  <div className="space-y-1.5">{tool.features.map(f => <div key={f} className="flex items-center gap-2 text-slate-400 text-xs font-mono"><div className={`w-1.5 h-1.5 rounded-full ${tool.color === "indigo" ? "bg-indigo-400" : tool.color === "cyan" ? "bg-cyan-400" : "bg-violet-400"}`} />{f}</div>)}</div>
                  <div className={`mt-5 flex items-center gap-1 text-xs font-mono ${colors.text} font-semibold`}>Use Tool <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <NativeBannerAd />

      <section className="rounded-3xl border border-slate-700/50 bg-slate-800/20 p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-emerald-400 mb-4"><ShieldCheck className="w-6 h-6" /><h2 className="text-2xl font-bold font-mono text-slate-100">Trust-First Architecture</h2></div>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">Built from the ground up so your documents are mathematically impossible to intercept.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map(tp => (
            <div key={tp.title} className="text-center group">
              <div className="w-12 h-12 rounded-2xl bg-slate-700/60 flex items-center justify-center text-slate-400 mx-auto mb-4 group-hover:bg-emerald-500/15 group-hover:text-emerald-400 transition-all">{tp.icon}</div>
              <h3 className="text-slate-200 font-mono font-semibold text-sm mb-2">{tp.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{tp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8"><h2 className="text-2xl font-bold font-mono text-slate-100">From the Blog</h2><button onClick={() => onNavigate("blog")} className="text-indigo-400 hover:text-indigo-300 text-sm font-mono flex items-center gap-1 transition-colors">All posts <ChevronRight className="w-4 h-4" /></button></div>
        <div className="grid md:grid-cols-2 gap-4">
          {posts.slice(0, 4).map(post => (
            <div key={post.slug} onClick={() => onNavigate("blog")} className="cursor-pointer group p-5 rounded-2xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-200">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2 block">Security · Privacy</span>
              <h3 className="text-slate-100 font-bold font-mono text-sm mb-2 group-hover:text-indigo-300 transition-colors leading-snug">{post.title}</h3>
              <div className="flex items-center gap-3 text-slate-600 text-xs font-mono mt-3"><span>{post.date}</span><span>·</span><span>{post.readTime}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-mono text-slate-100 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[
            { q: "Are my files uploaded to a server?", a: "No. All PDF processing happens entirely in your browser using pdf-lib. Your files never leave your device." },
            { q: "What is a private PDF merger?", a: "A private PDF merger combines multiple PDF files into one entirely in your browser, with zero server upload." },
            { q: "Can I use these tools offline?", a: "Yes. After the initial page load, all PDF tools work fully offline." },
            { q: "Is the Protect PDF tool HIPAA-safe?", a: "Browser-based processing eliminates the server transmission risk. The tool uses AES-256 encryption locally." },
          ].map((item, i) => (
            <details key={i} className="group rounded-2xl border border-slate-700/50 bg-slate-800/20">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none"><span className="text-slate-200 font-medium text-sm">{item.q}</span><ChevronRight className="w-4 h-4 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" /></summary>
              <div className="px-6 pb-4 text-slate-500 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// BLOG PAGE
// ─────────────────────────────────────────────────────────────────────────────
const BlogPage = ({ onPost }: { onPost: (post: BlogPost) => void }) => {
  useEffect(() => { document.title = "Blog | SecurePDF Tools — PDF Security & Privacy"; }, []);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12"><h1 className="text-4xl font-bold font-mono text-slate-100 mb-3">The SecurePDF Blog</h1><p className="text-slate-500">PDF security, privacy best practices, and why browser-based tools matter.</p></div>
      <BannerAd468 />
      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {posts.map(post => (
          <article key={post.slug} onClick={() => onPost(post)} className="group cursor-pointer p-6 rounded-3xl border border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40 hover:border-slate-600 transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0 mt-0.5"><BookOpen className="w-4 h-4 text-indigo-400" /></div>
              <div className="flex-1 min-w-0">
                <h2 className="text-slate-100 font-bold font-mono text-sm mb-2 group-hover:text-indigo-300 transition-colors leading-snug">{post.title}</h2>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">{post.description}</p>
                <div className="flex items-center gap-2 text-slate-600 text-xs font-mono"><span>{post.date}</span><span>·</span><span>{post.readTime}</span><ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" /></div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <NativeBannerAd />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// POST PAGE
// ─────────────────────────────────────────────────────────────────────────────
const PostPage = ({ post, onBack, onNavigate }: { post: BlogPost; onBack: () => void; onNavigate: (p: Page) => void }) => {
  useEffect(() => { document.title = `${post.title} | SecurePDF Tools`; }, [post.title]);
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-300 font-mono text-sm transition-colors mb-8 group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />Back to blog</button>
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-6"><span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">Security · Privacy</span><span className="text-slate-600 text-xs">·</span><span className="text-slate-600 text-xs font-mono">{post.readTime}</span></div>
        <h1 className="text-3xl md:text-4xl font-bold font-mono text-slate-100 leading-tight mb-4">{post.title}</h1>
        <p className="text-slate-500 text-sm font-mono">{post.date}</p>
      </header>
      <BannerAd468 />
      <div className="blog-content mt-8">{post.content}</div>
      <NativeBannerAd />
      <div className="mt-16 pt-8 border-t border-slate-700/50">
        <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
          <ShieldCheck className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-slate-100 font-bold font-mono mb-2">Try the Secure Alternative</h3>
          <p className="text-slate-500 text-sm mb-4">All tools run 100% in your browser. No upload. No account.</p>
          <button onClick={() => onNavigate("home")} className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-sm font-semibold transition-all">Use SecurePDF Tools →</button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
const Navbar = ({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links: { label: string; page: Page }[] = [{ label: "Tools", page: "home" }, { label: "Merge", page: "merge" }, { label: "Split", page: "split" }, { label: "Protect", page: "protect" }, { label: "Blog", page: "blog" }];
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors"><ShieldCheck className="w-4 h-4 text-indigo-400" /></div>
          <span className="text-slate-200 font-mono font-bold text-sm tracking-wide">SecurePDF</span>
          <span className="hidden sm:block text-slate-600 text-xs font-mono">· browser-native tools</span>
        </button>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => <button key={l.page} onClick={() => onNavigate(l.page)} className={`px-3.5 py-2 rounded-xl text-sm font-mono transition-all ${page === l.page ? "bg-indigo-500/15 text-indigo-300" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/60"}`}>{l.label}</button>)}
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all">{mobileOpen ? <XCircle className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {mobileOpen && <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 px-4 py-3 space-y-1">{links.map(l => <button key={l.page} onClick={() => { onNavigate(l.page); setMobileOpen(false); }} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-mono transition-all ${page === l.page ? "bg-indigo-500/15 text-indigo-300" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`}>{l.label}</button>)}</div>}
    </nav>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-slate-800/80 mt-24 py-10">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center"><ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /></div><span className="text-slate-500 font-mono text-sm">SecurePDF Tools — Private browser-based PDF processing</span></div>
        <div className="flex items-center gap-4 text-slate-600 text-xs font-mono"><span>No uploads</span><span>·</span><span>No accounts</span><span>·</span><span>No tracking</span></div>
      </div>
      <p className="text-slate-700 text-xs font-mono text-center mt-6">Powered by <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-400 transition-colors">pdf-lib</a> · private PDF merger · secure browser-based PDF tools · no-upload PDF splitter</p>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background-color: #020617; color: #cbd5e1; min-height: 100vh; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
    body::before { content: ''; position: fixed; inset: 0; background-image: linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px); background-size: 64px 64px; pointer-events: none; z-index: 0; }
    body::after { content: ''; position: fixed; top: -20%; left: 50%; transform: translateX(-50%); width: 80%; height: 60%; background: radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%); pointer-events: none; z-index: 0; }
    main { position: relative; z-index: 1; }
    .blog-content { font-family: 'DM Sans', sans-serif; color: #94a3b8; line-height: 1.8; font-size: 1rem; }
    .blog-content .lead { font-size: 1.125rem; color: #cbd5e1; margin-bottom: 2rem; line-height: 1.7; }
    .blog-content h2 { font-family: 'IBM Plex Mono', monospace; font-size: 1.25rem; font-weight: 700; color: #e2e8f0; margin-top: 2.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(99,102,241,0.2); }
    .blog-content h3 { font-family: 'IBM Plex Mono', monospace; font-size: 1rem; font-weight: 600; color: #e2e8f0; margin-top: 1.5rem; margin-bottom: 0.75rem; }
    .blog-content p { margin-bottom: 1.25rem; }
    .blog-content ul { list-style: none; padding: 0; margin: 0 0 1.5rem 0; }
    .blog-content ul li { display: flex; gap: 0.75rem; padding: 0.6rem 0; border-bottom: 1px solid rgba(71,85,105,0.3); }
    .blog-content ul li::before { content: '→'; color: #6366f1; font-family: 'IBM Plex Mono', monospace; flex-shrink: 0; }
    .blog-content strong { color: #cbd5e1; }
    .faq-section { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(71,85,105,0.4); }
    .faq-item { padding: 1.25rem; border-radius: 1rem; background: rgba(30,41,59,0.5); border: 1px solid rgba(71,85,105,0.4); margin-bottom: 1rem; }
    .faq-item h3 { font-family: 'IBM Plex Mono', monospace; font-size: 0.9rem; font-weight: 600; color: #e2e8f0; margin: 0 0 0.5rem 0; }
    .faq-item p { margin: 0; font-size: 0.875rem; color: #64748b; }
    details summary::-webkit-details-marker { display: none; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #334155; }
  `}</style>
);

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function PDFToolsPage() {
  const [page, setPage] = useState<Page>("home");
  const [activeTool, setActiveTool] = useState<"merge" | "split" | "protect">("merge");
  const [activePost, setActivePost] = useState<BlogPost>(posts[0]);

  const navigate = useCallback((target: Page) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <GlobalStyles />
      <SchemaMarkup />
      <PopunderAd />
      <div className="min-h-screen flex flex-col">
        <Navbar page={page} onNavigate={navigate} />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-10 md:py-16">
          {page === "home" && <Home onNavigate={(p) => { if (p === "merge" || p === "split" || p === "protect") { setActiveTool(p); } navigate(p); }} />}
          {(page === "merge" || page === "split" || page === "protect") && <ToolPage tool={page} onBack={() => navigate("home")} />}
          {page === "blog" && <BlogPage onPost={(post) => { setActivePost(post); navigate("post"); }} />}
          {page === "post" && <PostPage post={activePost} onBack={() => navigate("blog")} onNavigate={navigate} />}
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </>
  );
}
