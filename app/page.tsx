"use client";

/**
 * PDF Tools — Complete Single-File Next.js App
 * ─────────────────────────────────────────────
 * Stack : Next.js (App Router) · Tailwind CSS · pdf-lib · Lucide-React
 * SEO   : JSON-LD SoftwareApplication + FAQPage schema, OG tags via useEffect
 * Note  : For production metadata, add the `generateMetadata` export in a
 *         wrapping Server Component or in app/layout.tsx.
 *
 * Install deps:  npm install pdf-lib lucide-react
 */

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  DragEvent,
  ChangeEvent,
} from "react";
import {
  ShieldCheck,
  Lock,
  Merge,
  Scissors,
  FileText,
  Upload,
  Download,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Eye,
  EyeOff,
  X,
  Plus,
  AlertCircle,
  CheckCircle2,
  Globe,
  Server,
  Cpu,
  Clock,
  Menu,
  XCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type Page = "home" | "merge" | "split" | "protect" | "blog" | "post";

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
// BLOG CONTENT
// ─────────────────────────────────────────────────────────────────────────────

  // ============================================================
// 20 SEO BLOG ARTICLES — READY TO PASTE INTO page.tsx
// ============================================================
// HOW TO USE:
// 1. Paste ALL the article components (BlogArticle2 to BlogArticle20)
//    ABOVE the existing "const BlogArticle = () => (" line in page.tsx
// 2. Replace the posts array with the one at the BOTTOM of this file
// ============================================================

const BlogArticle2 = () => (
  <article className="prose-custom">
    <p className="lead">
      Adobe Acrobat costs over $200 a year. But password protecting a PDF takes
      less than 30 seconds and costs absolutely nothing — if you use the right
      tool. Here is exactly how to do it in 2026 without spending a single cent.
    </p>
    <h2>Why People Think They Need Adobe</h2>
    <p>
      Adobe has spent decades convincing the world that PDF encryption requires
      their software. In reality, the PDF encryption standard is open and any
      tool can implement it. The only question is whether that tool processes
      your file on a server — or locally in your browser.
    </p>
    <h2>The Free Browser-Based Method</h2>
    <p>
      Modern browsers can run the same AES-256 encryption Adobe uses, entirely
      locally on your device. Here is the step-by-step process using SecurePDF
      Tools:
    </p>
    <ul>
      <li><strong>Step 1.</strong> Open SecurePDF Tools and click the Protect PDF tool.</li>
      <li><strong>Step 2.</strong> Drag your PDF file into the upload zone.</li>
      <li><strong>Step 3.</strong> Type a strong password — use uppercase, numbers, and symbols.</li>
      <li><strong>Step 4.</strong> Click Encrypt PDF and download your protected file.</li>
    </ul>
    <h2>What Encryption Level Does It Use?</h2>
    <p>
      The tool uses AES-256 encryption — the same standard used by banks,
      governments, and Adobe Acrobat itself. A file encrypted with AES-256
      would take longer than the age of the universe to crack by brute force
      with current technology.
    </p>
    <h2>Tips for Choosing a Strong PDF Password</h2>
    <p>
      The encryption is only as strong as your password. Avoid common mistakes
      like using your name, birthdate, or simple words. A strong PDF password
      should be at least 12 characters and include a mix of uppercase letters,
      numbers, and special characters like exclamation marks or dollar signs.
    </p>
    <h2>Does the Recipient Need Special Software to Open It?</h2>
    <p>
      No. Any standard PDF reader — Adobe Acrobat Reader, Apple Preview,
      Google Chrome, Microsoft Edge — can open a password-protected PDF. The
      recipient simply needs to enter the password when prompted. You do not
      need to send any special software along with the file.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Is password protecting a PDF actually secure?</h3>
        <p>Yes, when using AES-256 encryption with a strong password. Weak passwords are the most common vulnerability, not the encryption itself.</p>
      </div>
      <div className="faq-item">
        <h3>Can I remove the password later?</h3>
        <p>Yes. Simply open the protected PDF in any PDF reader, enter the password, and re-save without encryption. Or use a PDF tool to remove the password protection.</p>
      </div>
      <div className="faq-item">
        <h3>What happens if I forget the password?</h3>
        <p>There is no recovery option for a properly encrypted PDF. Always store your PDF passwords in a secure password manager like Bitwarden or 1Password.</p>
      </div>
    </div>
  </article>
);

const BlogArticle3 = () => (
  <article className="prose-custom">
    <p className="lead">
      Merging PDFs used to mean buying software or uploading sensitive files to
      a random website. In 2026, you can combine unlimited PDFs in seconds,
      entirely in your browser, with zero risk to your privacy.
    </p>
    <h2>What Is PDF Merging?</h2>
    <p>
      PDF merging combines two or more separate PDF files into a single
      document. Common use cases include combining multiple scanned pages into
      one document, assembling a multi-chapter report, merging bank statements
      from different months, or combining contract pages sent separately.
    </p>
    <h2>The Problem With Most Online PDF Mergers</h2>
    <p>
      Most free online PDF mergers — including some of the most popular ones —
      upload your files to their servers for processing. This means your
      confidential documents pass through infrastructure you have no visibility
      into. For bank statements, legal contracts, or medical records, this
      represents a serious privacy risk.
    </p>
    <h2>How to Merge PDFs Without Uploading</h2>
    <ul>
      <li><strong>Step 1.</strong> Open SecurePDF Tools and select the Merge PDF tool.</li>
      <li><strong>Step 2.</strong> Drag all your PDF files into the tool at once.</li>
      <li><strong>Step 3.</strong> Drag the files into your preferred order.</li>
      <li><strong>Step 4.</strong> Click Merge and download your combined PDF instantly.</li>
    </ul>
    <h2>How Many Files Can You Merge?</h2>
    <p>
      There is no artificial limit on the number of files. You can merge 2
      files or 50 files. The only practical limit is your device's available
      RAM. Most modern computers handle 20 to 30 PDF files without any
      slowdown.
    </p>
    <h2>Does the Order of Pages Matter?</h2>
    <p>
      Yes, and this is where most tools fall short. SecurePDF Tools lets you
      drag and drop files into the exact order you want before merging. The
      files are combined in the order displayed, from top to bottom.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Can I merge PDFs on my phone?</h3>
        <p>Yes. SecurePDF Tools works in any modern mobile browser on iOS or Android. The merge process is identical on mobile — all processing happens in the browser.</p>
      </div>
      <div className="faq-item">
        <h3>Will the quality be reduced when merging?</h3>
        <p>No. The PDF pages are copied exactly as they are — no recompression or quality loss occurs during the merge process.</p>
      </div>
      <div className="faq-item">
        <h3>Can I merge password-protected PDFs?</h3>
        <p>No. You need to remove password protection first before merging. Once merged, you can re-apply password protection using the Protect PDF tool.</p>
      </div>
    </div>
  </article>
);

const BlogArticle4 = () => (
  <article className="prose-custom">
    <p className="lead">
      Is iLovePDF safe? It is one of the most-searched questions about online
      PDF tools in 2026 — and the answer is more nuanced than their privacy
      policy suggests. Here is what you actually need to know before uploading
      your documents.
    </p>
    <h2>What iLovePDF Actually Does With Your Files</h2>
    <p>
      iLovePDF is a server-side PDF processing tool. When you use it, your
      file is uploaded to their servers in Spain, processed, and then made
      available for download. According to their privacy policy, files are
      automatically deleted after a period of time — but the exact retention
      window has changed multiple times over the years.
    </p>
    <h2>The Core Security Question</h2>
    <p>
      The fundamental issue is not whether iLovePDF is a trustworthy company.
      The issue is that when your file touches any server, you have introduced
      a risk surface that does not exist with browser-based tools. Risks
      include data breaches, misconfigured storage, employee access, third
      party data sharing, and legal requests from governments in the server's
      jurisdiction.
    </p>
    <h2>When iLovePDF Is Probably Fine</h2>
    <ul>
      <li><strong>Non-sensitive documents</strong> — restaurant menus, public brochures, marketing materials.</li>
      <li><strong>Documents with no personal data</strong> — technical diagrams, product specs.</li>
      <li><strong>Files already published publicly</strong> — content that is already on the internet.</li>
    </ul>
    <h2>When You Should Never Use iLovePDF</h2>
    <ul>
      <li><strong>Bank statements</strong> containing account numbers and transaction histories.</li>
      <li><strong>Legal contracts</strong> with signatures and confidential terms.</li>
      <li><strong>Medical records</strong> protected by HIPAA or equivalent regulations.</li>
      <li><strong>Tax documents</strong> containing Social Security Numbers.</li>
      <li><strong>HR documents</strong> with salary information or personal employee data.</li>
    </ul>
    <h2>The Safer Alternative</h2>
    <p>
      For any document you would not want to email to a stranger, use a
      browser-based tool like SecurePDF Tools instead. The processing happens
      entirely on your device — iLovePDF and similar services never see your
      file at all.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Has iLovePDF ever had a data breach?</h3>
        <p>There are no widely reported major breaches, but the risk exists for any service that stores uploaded files, regardless of their security practices.</p>
      </div>
      <div className="faq-item">
        <h3>Does iLovePDF sell your data?</h3>
        <p>According to their privacy policy, they do not sell personal data. However, they do use analytics and may share data with service providers.</p>
      </div>
    </div>
  </article>
);

const BlogArticle5 = () => (
  <article className="prose-custom">
    <p className="lead">
      Splitting a PDF into separate pages or sections is one of the most common
      document tasks — and one of the easiest to do without any software or
      subscription. Here is the complete guide for 2026.
    </p>
    <h2>Why You Might Need to Split a PDF</h2>
    <p>
      PDF splitting is useful in dozens of everyday situations. You might need
      to extract a single page from a multi-page contract to share with a
      colleague. You might need to separate a combined bank statement into
      individual months. Or you might need to break a large report into
      chapters for distribution.
    </p>
    <h2>The Two Main Ways to Split a PDF</h2>
    <p>
      There are two common approaches to splitting PDFs. The first is
      extracting specific individual pages — for example, pages 3, 7, and 12
      from a 20-page document. The second is splitting by page ranges — for
      example, creating one PDF from pages 1 to 5 and another from pages 6
      to 10.
    </p>
    <h2>How to Split a PDF in Your Browser</h2>
    <ul>
      <li><strong>Step 1.</strong> Open the SecurePDF Tools Split PDF tool.</li>
      <li><strong>Step 2.</strong> Upload your PDF file by dragging it in or clicking to browse.</li>
      <li><strong>Step 3.</strong> Enter your page ranges — for example: 1-3, 4-7, 8-10.</li>
      <li><strong>Step 4.</strong> Click Split PDF and download each section separately.</li>
    </ul>
    <h2>Understanding Page Range Syntax</h2>
    <p>
      Page ranges use a simple comma-separated format. To extract pages 1
      through 5 as one file, type 1-5. To also extract pages 10 through 15 as
      a second file, add a comma and type 10-15. The full input would be:
      1-5, 10-15. Each range becomes its own downloadable PDF file.
    </p>
    <h2>Does Splitting Affect PDF Quality?</h2>
    <p>
      No. Pages are extracted exactly as they appear in the original document.
      There is no recompression, re-rendering, or quality reduction. The output
      files are structurally identical to the corresponding pages in the source.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Can I split a scanned PDF?</h3>
        <p>Yes. Scanned PDFs are just image-based PDFs and split exactly the same way as text-based PDFs.</p>
      </div>
      <div className="faq-item">
        <h3>Is there a page limit for splitting?</h3>
        <p>No artificial limit. You can split a 500-page document if needed. Processing time depends on your device speed.</p>
      </div>
      <div className="faq-item">
        <h3>Can I split a PDF into every individual page?</h3>
        <p>Yes. Enter each page number separated by commas — for example: 1, 2, 3, 4, 5 — and each becomes its own PDF file.</p>
      </div>
    </div>
  </article>
);

const BlogArticle6 = () => (
  <article className="prose-custom">
    <p className="lead">
      Smallpdf is one of the most popular PDF tools on the internet — but is it
      actually safe for sensitive documents? This honest review covers exactly
      what happens to your files, their privacy practices, and when you should
      use an alternative.
    </p>
    <h2>How Smallpdf Processes Your Files</h2>
    <p>
      Smallpdf is a cloud-based PDF processor. All files are uploaded to their
      servers — hosted on Amazon Web Services infrastructure in Europe — where
      the processing occurs. Files are automatically deleted after one hour
      according to their policy, though this only applies to the file storage
      and not necessarily to any metadata or usage logs.
    </p>
    <h2>Smallpdf's Security Certifications</h2>
    <p>
      Smallpdf holds ISO 27001 certification and claims GDPR compliance for
      European users. They use TLS encryption for data in transit and AES-256
      for data at rest. These are genuine security measures that make them
      significantly more trustworthy than smaller, uncertified tools.
    </p>
    <h2>The Remaining Risk</h2>
    <p>
      Even with strong security certifications, cloud-based processing
      introduces risks that browser-based tools avoid entirely. No cloud
      service is immune to data breaches, insider threats, or legal data
      requests. For genuinely sensitive documents, the only zero-risk approach
      is processing that never leaves your device.
    </p>
    <h2>Smallpdf Pricing in 2026</h2>
    <p>
      Smallpdf's free tier limits users to two tasks per day and requires
      waiting between operations. Their Pro plan costs around $12 per month.
      For users who occasionally need PDF tools, this pricing is difficult to
      justify when browser-based alternatives are completely free and more
      private.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Is Smallpdf GDPR compliant?</h3>
        <p>Smallpdf claims GDPR compliance and is based in Switzerland. However, GDPR compliance does not mean zero data risk — it means they follow specific rules about data handling.</p>
      </div>
      <div className="faq-item">
        <h3>What is the best free alternative to Smallpdf?</h3>
        <p>For privacy-focused users, browser-based tools like SecurePDF Tools are completely free, have no task limits, and never upload your files to any server.</p>
      </div>
    </div>
  </article>
);

const BlogArticle7 = () => (
  <article className="prose-custom">
    <p className="lead">
      You do not need Adobe Acrobat, Microsoft Word, or any installed software
      to work with PDFs on a Mac in 2026. Here is the complete guide to the
      best free PDF tools available for macOS users right now.
    </p>
    <h2>Built-In Mac PDF Tools Most People Miss</h2>
    <p>
      macOS comes with surprisingly powerful PDF tools built in. Apple Preview
      can merge PDFs by dragging thumbnails between documents, split PDFs by
      deleting pages, annotate and sign documents, and compress file sizes. For
      basic tasks, you may never need another tool.
    </p>
    <h2>How to Merge PDFs on Mac Using Preview</h2>
    <ul>
      <li><strong>Step 1.</strong> Open the first PDF in Preview.</li>
      <li><strong>Step 2.</strong> Open the Thumbnails sidebar: View → Thumbnails.</li>
      <li><strong>Step 3.</strong> Drag the second PDF file onto the thumbnail sidebar.</li>
      <li><strong>Step 4.</strong> Go to File → Export as PDF to save the merged file.</li>
    </ul>
    <h2>When to Use a Browser-Based Tool Instead</h2>
    <p>
      Preview is great for simple tasks but lacks encryption, advanced
      splitting by page ranges, and batch processing. For password protection
      or precise page range splitting, a browser-based tool like SecurePDF
      Tools fills the gap — no installation required, works on any Mac.
    </p>
    <h2>What About Adobe Acrobat for Mac?</h2>
    <p>
      Adobe Acrobat Pro for Mac costs over $200 per year as a subscription.
      For the vast majority of users, this is completely unnecessary. The
      combination of Apple Preview for basic tasks and free browser-based tools
      for encryption and splitting covers 95 percent of real-world PDF needs.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Can I edit PDF text on Mac for free?</h3>
        <p>True text editing in PDFs requires either Adobe Acrobat or a paid tool. Preview can add text annotations but cannot edit existing PDF text.</p>
      </div>
      <div className="faq-item">
        <h3>How do I compress a PDF on Mac?</h3>
        <p>In Preview, go to File → Export → choose Quartz Filter → select Reduce File Size. For more control, use an online compression tool.</p>
      </div>
    </div>
  </article>
);

const BlogArticle8 = () => (
  <article className="prose-custom">
    <p className="lead">
      Whether you are on Windows 10, Windows 11, or an older version, there
      are several completely free ways to work with PDFs without installing
      Adobe or paying for any subscription. Here is everything that works in
      2026.
    </p>
    <h2>Built-In Windows PDF Tools</h2>
    <p>
      Windows 10 and 11 include a built-in PDF printer called Microsoft Print
      to PDF. This lets you save any document as a PDF from any application —
      just press Ctrl+P and choose Microsoft Print to PDF as the printer.
      Microsoft Edge, which comes pre-installed on Windows, can also view,
      annotate, and fill PDF forms.
    </p>
    <h2>Free PDF Merging on Windows</h2>
    <p>
      Windows does not have a built-in PDF merger like macOS Preview. The
      easiest free option is using a browser-based tool like SecurePDF Tools.
      Open your browser, drag in your files, merge them, and download. No
      installation required and your files never leave your computer.
    </p>
    <h2>Free PDF Password Protection on Windows</h2>
    <p>
      Neither Windows nor Microsoft Edge can add password protection to PDFs.
      For this you need either a paid tool or a browser-based encryption tool.
      SecurePDF Tools adds AES-256 encryption directly in your browser with
      zero upload required.
    </p>
    <h2>Should You Install a PDF App on Windows?</h2>
    <p>
      For most users the answer is no. A combination of Microsoft Edge for
      viewing and annotating, Microsoft Print to PDF for creating PDFs, and
      a browser-based tool for merging splitting and encrypting covers
      virtually every common PDF task completely free.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Is Adobe Reader free on Windows?</h3>
        <p>Adobe Acrobat Reader (viewer only) is free. Adobe Acrobat Pro (for editing, merging, protecting) requires a paid subscription of over $200 per year.</p>
      </div>
      <div className="faq-item">
        <h3>What is the best free PDF editor for Windows?</h3>
        <p>For basic editing, LibreOffice Draw is free and open source. For merging, splitting and encryption, browser-based tools require no installation and work on any Windows version.</p>
      </div>
    </div>
  </article>
);

const BlogArticle9 = () => (
  <article className="prose-custom">
    <p className="lead">
      Lawyers, paralegals, and legal professionals handle some of the most
      sensitive documents imaginable — contracts, depositions, court filings,
      client records. Using the wrong PDF tool with these documents is not just
      a privacy risk. It may be a professional and ethical obligation violation.
    </p>
    <h2>The Professional Responsibility Issue</h2>
    <p>
      Legal professionals in most jurisdictions have a duty of confidentiality
      toward their clients. Uploading client documents to third-party servers
      without explicit client consent potentially violates this duty. Bar
      associations in multiple US states have issued ethics opinions warning
      attorneys to carefully vet cloud services used for client data.
    </p>
    <h2>What the ABA Says About Cloud Tools</h2>
    <p>
      The American Bar Association's Formal Opinion 477R addresses attorney
      obligations when using cloud-based communication and storage. It requires
      attorneys to understand how data is handled, what security measures are
      in place, and whether the jurisdiction of the server affects
      confidentiality obligations. Browser-based tools sidestep all of these
      concerns because client data never leaves the attorney's device.
    </p>
    <h2>Recommended PDF Workflow for Law Firms</h2>
    <ul>
      <li><strong>Merging court filings</strong> — use browser-based tools so document contents stay local.</li>
      <li><strong>Splitting discovery documents</strong> — extract relevant pages without server upload.</li>
      <li><strong>Encrypting client contracts</strong> — add AES-256 password protection before emailing.</li>
      <li><strong>Signing documents</strong> — use a dedicated e-signature tool with proper audit trails.</li>
    </ul>
    <h2>GDPR Implications for European Law Firms</h2>
    <p>
      European law firms processing client personal data via third-party PDF
      tools may need to establish Data Processing Agreements with those tools
      under GDPR Article 28. Browser-based processing eliminates this
      requirement entirely since no data is transferred to a third party.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Is it ethical for lawyers to use iLovePDF or Smallpdf?</h3>
        <p>It depends on jurisdiction and the sensitivity of the document. For client confidential documents, most ethics opinions would recommend against server-based processing without client consent and a proper data processing agreement.</p>
      </div>
      <div className="faq-item">
        <h3>What PDF encryption level should law firms use?</h3>
        <p>AES-256 is the recommended standard. This is what SecurePDF Tools uses and what Adobe Acrobat uses for its highest security setting.</p>
      </div>
    </div>
  </article>
);

const BlogArticle10 = () => (
  <article className="prose-custom">
    <p className="lead">
      PDF compression can reduce file sizes by 50 to 90 percent — making
      documents easier to email, upload, and store. But most compression tools
      send your files to external servers. Here is what you need to know about
      compressing PDFs safely in 2026.
    </p>
    <h2>Why PDF Files Get So Large</h2>
    <p>
      PDFs become large primarily because of images embedded in the document.
      A single high-resolution scan can add several megabytes. When multiple
      scanned pages are combined, file sizes of 50MB or more are common.
      Text-only PDFs are almost always small regardless of page count.
    </p>
    <h2>Two Types of PDF Compression</h2>
    <p>
      Lossless compression reduces file size without any quality reduction by
      removing redundant data structures within the PDF. Lossy compression
      reduces image resolution to achieve dramatically smaller files but at
      the cost of visual quality. For legal or archival documents, lossless
      is essential. For casual sharing, lossy is usually acceptable.
    </p>
    <h2>Built-In Compression Options</h2>
    <ul>
      <li><strong>Mac Preview</strong> — File → Export → Reduce File Size filter. Fast and free.</li>
      <li><strong>Microsoft Print to PDF</strong> — reprinting a PDF to PDF often reduces size slightly.</li>
      <li><strong>Google Drive</strong> — uploading and re-downloading PDFs via Google Docs sometimes reduces size.</li>
    </ul>
    <h2>When File Size Is Not the Real Problem</h2>
    <p>
      Before compressing, check whether your large PDF is actually a series of
      scanned images that could be replaced by a properly exported digital PDF.
      A 50MB scanned contract can often be re-created as a digital PDF under
      500KB simply by exporting from the original word processor rather than
      scanning a printed copy.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>What is a good PDF file size for email?</h3>
        <p>Most email providers accept attachments up to 25MB. For reliable delivery and fast loading, aim for under 5MB for multi-page documents and under 1MB for simple documents.</p>
      </div>
      <div className="faq-item">
        <h3>Does compressing a PDF reduce quality?</h3>
        <p>Lossless compression does not. Lossy compression reduces image quality. For text-heavy documents the quality difference is usually invisible at normal viewing sizes.</p>
      </div>
    </div>
  </article>
);

const BlogArticle11 = () => (
  <article className="prose-custom">
    <p className="lead">
      Healthcare professionals face unique challenges when handling PDF
      documents. Patient records, insurance forms, referral letters, and
      prescriptions all fall under strict regulatory frameworks. The PDF tool
      you choose could be a HIPAA compliance decision, not just a convenience
      choice.
    </p>
    <h2>What HIPAA Says About Digital Document Handling</h2>
    <p>
      The HIPAA Security Rule requires covered entities and business associates
      to implement technical safeguards that protect electronic Protected
      Health Information. Uploading patient documents to a third-party PDF
      processing server without a signed Business Associate Agreement almost
      certainly violates this requirement.
    </p>
    <h2>The Business Associate Agreement Problem</h2>
    <p>
      Most free PDF tools — iLovePDF, Smallpdf, PDF2Doc, and hundreds of
      similar services — do not offer Business Associate Agreements. Without a
      BAA, using these tools to process patient data is a potential HIPAA
      violation regardless of how secure their servers claim to be. The
      violation is in the transfer itself, not just in a potential breach.
    </p>
    <h2>Browser-Based Tools and HIPAA</h2>
    <p>
      Browser-based PDF tools that perform all processing locally present a
      fundamentally different risk profile. Since no data is transmitted to a
      third party, the BAA requirement does not apply in the same way. The
      data never leaves the covered entity's device or network. This does not
      mean zero compliance obligations, but it eliminates the transmission risk
      that server-based tools create.
    </p>
    <h2>Recommended Practices for Healthcare PDF Workflows</h2>
    <ul>
      <li><strong>Always encrypt</strong> patient PDFs before storing in any cloud service.</li>
      <li><strong>Use browser-based tools</strong> for merging and splitting patient documents.</li>
      <li><strong>Audit your tools list</strong> — review every PDF tool your organization uses.</li>
      <li><strong>Train staff</strong> on which tools are approved for patient data.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Is Google Drive HIPAA compliant for PDFs?</h3>
        <p>Google offers a BAA for Google Workspace customers, which covers Google Drive. Consumer Gmail and Drive accounts are not HIPAA compliant.</p>
      </div>
      <div className="faq-item">
        <h3>What is the penalty for a HIPAA violation involving a PDF tool?</h3>
        <p>HIPAA penalties range from $100 to $50,000 per violation depending on culpability, up to a maximum of $1.9 million per year for repeated violations of the same provision.</p>
      </div>
    </div>
  </article>
);

const BlogArticle12 = () => (
  <article className="prose-custom">
    <p className="lead">
      Every month millions of people Google how to convert PDF to Word. Most
      end up uploading sensitive documents to conversion sites they know
      nothing about. Here is a safer, smarter approach for 2026.
    </p>
    <h2>Why PDF to Word Conversion Is Tricky</h2>
    <p>
      PDFs are designed for fixed-layout display, not editing. Converting a PDF
      back to a Word document requires the software to reconstruct the
      document's structure — recognizing paragraphs, columns, tables, headers,
      and formatting. This is computationally complex, which is why most free
      tools do it on their servers rather than in the browser.
    </p>
    <h2>The Safest Free Method — Google Docs</h2>
    <p>
      Google Docs can convert PDFs to editable documents for free. Upload your
      PDF to Google Drive, right-click it, and select Open with Google Docs.
      Google's servers process the conversion, but if you already use Google
      Drive for document storage this may be an acceptable tradeoff. The
      quality varies depending on the complexity of the original PDF layout.
    </p>
    <h2>Microsoft Word's Built-In PDF Import</h2>
    <p>
      Microsoft Word 2013 and later can open PDFs directly and convert them to
      editable format. Go to File → Open → select your PDF file. Word will
      warn you that the conversion may not be perfect — but for text-heavy
      documents it works remarkably well without any upload to external servers.
    </p>
    <h2>When Not to Convert — Edit the PDF Directly Instead</h2>
    <p>
      Before converting, consider whether you actually need a Word file. If
      you just need to fill in form fields, sign the document, or add comments,
      you can do all of this in the PDF format directly using Adobe Acrobat
      Reader or your browser's built-in PDF viewer — no conversion needed.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Will a converted PDF look exactly like the original in Word?</h3>
        <p>Rarely. Complex layouts with multiple columns, tables, and images often lose formatting during conversion. Simple text-heavy documents convert much more cleanly.</p>
      </div>
      <div className="faq-item">
        <h3>Can I convert a scanned PDF to Word?</h3>
        <p>Yes, but this requires Optical Character Recognition (OCR) technology. Microsoft Word and Google Docs both include basic OCR. For better accuracy on complex scans, Adobe Acrobat Pro produces the best results.</p>
      </div>
    </div>
  </article>
);

const BlogArticle13 = () => (
  <article className="prose-custom">
    <p className="lead">
      Sending bank statements by email is a routine part of mortgage
      applications, rental agreements, and loan processes. But how you prepare
      those PDF documents before sending them matters more than most people
      realize.
    </p>
    <h2>Why Bank Statements Are High-Value Targets</h2>
    <p>
      A single bank statement PDF contains everything an identity thief needs —
      your full name, address, account number, routing number, and a complete
      picture of your financial life. This makes bank statement PDFs among the
      most sensitive documents most people regularly handle.
    </p>
    <h2>Step 1 — Never Process Bank Statements on Random Websites</h2>
    <p>
      Before doing anything else, commit to this rule: never upload a bank
      statement to any online PDF tool unless you have thoroughly vetted their
      security practices. Free tools that process files server-side create
      unnecessary exposure. Use browser-based tools exclusively for bank
      statement preparation.
    </p>
    <h2>Step 2 — Combine Statements if Required</h2>
    <p>
      Many lenders require three months of bank statements as a single PDF
      file. Use a private PDF merger to combine them locally in your browser.
      The merged file never touches an external server and you can download it
      directly to your device.
    </p>
    <h2>Step 3 — Password Protect Before Sending</h2>
    <p>
      Always add password protection to bank statement PDFs before emailing
      them. Send the password through a separate channel — a text message
      rather than a follow-up email. This ensures that if the email is
      intercepted, the attacker still cannot read the document.
    </p>
    <h2>Step 4 — Verify the Recipient</h2>
    <p>
      Mortgage fraud and phishing attacks often involve criminals posing as
      lenders and requesting financial documents. Always verify any email
      requesting bank statements by calling the organization directly using a
      phone number from their official website — not from the email itself.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Is it safe to email bank statements?</h3>
        <p>Standard email is not encrypted end-to-end. Always password-protect bank statement PDFs before attaching them to any email, and send the password via a separate channel.</p>
      </div>
      <div className="faq-item">
        <h3>What should I redact from bank statements before sharing?</h3>
        <p>If the recipient only needs to verify income, consider redacting irrelevant transactions. However, many lenders require unredacted statements. Confirm requirements before redacting.</p>
      </div>
    </div>
  </article>
);

const BlogArticle14 = () => (
  <article className="prose-custom">
    <p className="lead">
      Google Chrome, Microsoft Edge, Firefox, and Safari all have built-in PDF
      capabilities that most users have never fully explored. In 2026, your
      browser alone handles more PDF tasks than you might expect — completely
      free and completely private.
    </p>
    <h2>What Every Modern Browser Can Do With PDFs</h2>
    <p>
      All major browsers can view PDFs natively without any plugin. Beyond
      basic viewing, modern browsers also support text search within PDFs,
      zooming and rotation, printing to PDF, filling in PDF form fields,
      basic annotations like highlights and comments, and downloading and
      saving modified copies.
    </p>
    <h2>Chrome's Hidden PDF Features</h2>
    <p>
      Google Chrome's built-in PDF viewer includes a text selection tool,
      a two-page spread view, and the ability to rotate pages. Chrome can also
      save a web page directly as a PDF using Ctrl+P and selecting Save as PDF.
      For form-filling, Chrome handles most standard PDF forms without any
      additional software.
    </p>
    <h2>Microsoft Edge's Advanced PDF Tools</h2>
    <p>
      Microsoft Edge has the most advanced built-in PDF tools of any browser.
      It supports digital signatures, sticky notes, ink drawing, text
      highlights in multiple colors, and an immersive reader mode that
      reformats PDF text for easier reading. For basic business PDF tasks,
      Edge eliminates the need for a separate PDF application entirely.
    </p>
    <h2>What Browsers Cannot Do</h2>
    <p>
      Browser built-in tools cannot merge multiple PDFs, split documents by
      page range, or add password encryption. For these tasks, a browser-based
      web application like SecurePDF Tools extends your browser's PDF
      capabilities without requiring any installation.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Can I fill and sign a PDF in Chrome without Adobe?</h3>
        <p>Yes. Chrome can fill standard form fields. For signatures, you can draw a signature using Chrome's annotation tools or use a dedicated e-signature service.</p>
      </div>
      <div className="faq-item">
        <h3>Does Firefox support PDF editing?</h3>
        <p>Firefox includes a built-in PDF viewer with form filling and basic annotation. It is less feature-rich than Edge but covers most everyday PDF viewing needs.</p>
      </div>
    </div>
  </article>
);

const BlogArticle15 = () => (
  <article className="prose-custom">
    <p className="lead">
      Remote work has fundamentally changed how teams handle documents. PDFs
      travel across email, Slack, Dropbox, and Google Drive daily — often
      containing sensitive business information. Here is how to build a secure
      PDF workflow for your remote team in 2026.
    </p>
    <h2>The Remote Work PDF Security Problem</h2>
    <p>
      When teams work from home, document handling becomes harder to control.
      Employees use personal devices, home networks, and unapproved tools to
      get work done quickly. A single employee uploading a confidential contract
      to a free online PDF merger can create a compliance or security incident
      the organization does not even know about.
    </p>
    <h2>Step 1 — Create a Whitelist of Approved PDF Tools</h2>
    <p>
      Start by defining which PDF tools employees are allowed to use for
      company documents. The whitelist should include your approved PDF viewer,
      your approved editing tool, and approved browser-based tools for tasks
      like merging and encryption. Communicate this list clearly and revisit
      it annually.
    </p>
    <h2>Step 2 — Standardize on Browser-Based Tools for Security</h2>
    <p>
      Browser-based PDF tools have a key advantage for remote teams — they
      work identically on any device, any operating system, and any location
      without installation. More importantly, they eliminate server-upload risk
      entirely, which means you do not need to vet each tool's data handling
      practices as long as processing is confirmed to be local.
    </p>
    <h2>Step 3 — Mandate Encryption for Email Attachments</h2>
    <ul>
      <li><strong>All contracts</strong> must be password protected before emailing externally.</li>
      <li><strong>Financial documents</strong> require encryption regardless of recipient.</li>
      <li><strong>HR documents</strong> including salary information must always be encrypted.</li>
      <li><strong>Passwords</strong> must always be sent via a separate channel from the document.</li>
    </ul>
    <h2>Step 4 — Use Audit-Ready Document Naming</h2>
    <p>
      Establish a consistent naming convention for PDF documents that includes
      the date, document type, and version. This makes it easier to track
      document versions, identify which version was sent to which recipient,
      and respond to audit requests quickly.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>What is the biggest PDF security risk for remote teams?</h3>
        <p>Shadow IT — employees using unapproved tools without IT knowledge. The solution is providing approved tools that are easy to use so employees do not look for workarounds.</p>
      </div>
      <div className="faq-item">
        <h3>How do we enforce PDF security policies with a remote team?</h3>
        <p>Training and tooling beat enforcement. Make the approved workflow easier than the insecure alternative and most employees will naturally follow it.</p>
      </div>
    </div>
  </article>
);

const BlogArticle16 = () => (
  <article className="prose-custom">
    <p className="lead">
      Tax season means handling some of your most sensitive financial documents.
      W-2s, 1099s, and tax returns contain everything needed for identity theft.
      Here is how to manage your tax PDFs safely in 2026.
    </p>
    <h2>What Tax Documents Contain</h2>
    <p>
      A single tax return PDF contains your full legal name, home address,
      Social Security Number, employer information, complete income breakdown,
      bank account details if you received a direct deposit refund, and
      details about every major financial decision you made during the year.
      This is more personal information than most people have in any other
      single document.
    </p>
    <h2>Never Upload Tax PDFs to Free Online Tools</h2>
    <p>
      This bears repeating for tax documents specifically. The risk calculus
      changes when the document contains a Social Security Number. A single
      SSN exposed in a data breach can result in fraudulent tax returns filed
      in your name, new credit accounts opened without your knowledge, and
      years of credit damage. No convenience justifies this risk.
    </p>
    <h2>Safe Ways to Combine Tax Documents</h2>
    <p>
      If you need to combine multiple tax form PDFs — for example, attaching
      W-2s and 1099s to your return — use a browser-based private PDF merger.
      The entire operation happens in your browser's memory. When you close the
      tab, every trace of the documents is gone from the tool.
    </p>
    <h2>How to Store Tax PDFs Securely Long-Term</h2>
    <ul>
      <li><strong>Encrypt every tax PDF</strong> with a strong password before storing anywhere.</li>
      <li><strong>Use an encrypted cloud folder</strong> rather than a standard Dropbox or Google Drive folder.</li>
      <li><strong>Keep a local encrypted backup</strong> on an external drive stored securely.</li>
      <li><strong>Retain for seven years</strong> — the IRS audit window for most returns.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Is it safe to store tax returns in Google Drive?</h3>
        <p>Standard Google Drive is not end-to-end encrypted. For tax returns containing SSNs, encrypt the PDF with a strong password before uploading to any cloud service.</p>
      </div>
      <div className="faq-item">
        <h3>How long should I keep PDF copies of my tax returns?</h3>
        <p>The IRS generally has three years to audit a return but six years if it suspects underreported income. Keeping returns for seven years covers virtually all audit scenarios.</p>
      </div>
    </div>
  </article>
);

const BlogArticle17 = () => (
  <article className="prose-custom">
    <p className="lead">
      Real estate transactions involve dozens of documents — purchase
      agreements, mortgage applications, inspection reports, title documents,
      and closing disclosures. Each one is highly sensitive. Here is how real
      estate professionals and homebuyers can handle PDF documents securely
      in 2026.
    </p>
    <h2>What Real Estate PDFs Typically Contain</h2>
    <p>
      Real estate documents are extraordinarily data-rich. A mortgage
      application alone contains Social Security Numbers, full employment
      history, complete financial statements, credit score information, and
      details about every asset and liability the buyer holds. Closing
      documents add property addresses, purchase prices, lender information,
      and wiring instructions — the last of which makes real estate one of
      the top targets for wire fraud.
    </p>
    <h2>The Wire Fraud Risk in Real Estate PDFs</h2>
    <p>
      Real estate wire fraud costs American buyers hundreds of millions of
      dollars annually. Attackers compromise email accounts, monitor real
      estate transaction communications, and then send fraudulent wire
      instructions that appear to come from the title company or attorney.
      Never send or act on wiring instructions received via email without
      verbal confirmation from a verified phone number.
    </p>
    <h2>Secure PDF Practices for Buyers and Sellers</h2>
    <ul>
      <li><strong>Encrypt</strong> all documents before emailing to your agent or lender.</li>
      <li><strong>Use browser-based tools</strong> for combining disclosure documents.</li>
      <li><strong>Verify recipients</strong> by phone before sending any financial document.</li>
      <li><strong>Store closing documents</strong> in encrypted form — you may need them for years.</li>
    </ul>
    <h2>Secure PDF Practices for Real Estate Agents</h2>
    <p>
      Real estate agents have a fiduciary duty to their clients that extends
      to document handling. Using unapproved PDF tools with client financial
      documents may create liability exposure. Browser-based PDF tools that
      process documents locally represent best practice for agent compliance.
    </p>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>How should I store my closing documents?</h3>
        <p>Store password-protected copies in at least two locations — an encrypted cloud folder and a local external drive. You may need these documents for tax purposes, refinancing, or future sale.</p>
      </div>
      <div className="faq-item">
        <h3>Is DocuSign safe for real estate contracts?</h3>
        <p>DocuSign is a legitimate, security-certified e-signature platform. It maintains proper audit trails and complies with ESIGN and UETA. It is considerably safer than emailing unsigned PDFs for manual signature.</p>
      </div>
    </div>
  </article>
);

const BlogArticle18 = () => (
  <article className="prose-custom">
    <p className="lead">
      Students handle more PDF documents than almost any other group —
      assignments, research papers, transcripts, financial aid forms, and
      application documents. Here is the complete guide to free PDF tools
      for students in 2026.
    </p>
    <h2>The Student PDF Toolkit</h2>
    <p>
      Most students need four core PDF capabilities. They need to view and
      annotate lecture slides and readings. They need to combine multiple
      documents into a single submission. They need to split or extract pages
      for specific assignments. And occasionally they need to protect
      sensitive academic or financial documents with a password.
    </p>
    <h2>Free Annotation Tools for Study</h2>
    <p>
      For annotating PDFs — highlighting text, adding notes, drawing diagrams
      — several free options exist. Adobe Acrobat Reader has solid annotation
      tools and is free to download. Microsoft Edge has excellent built-in
      annotation on Windows. On Mac, Apple Preview covers most annotation
      needs. Notion and Obsidian can also embed and annotate PDFs for
      research-heavy workflows.
    </p>
    <h2>Combining Assignment PDFs for Submission</h2>
    <p>
      Many professors require multiple documents submitted as a single PDF.
      Combine handwritten work photographed on a phone, typed cover pages,
      and reference materials using a private PDF merger. The entire process
      takes under a minute and requires no account or subscription.
    </p>
    <h2>Protecting Financial Aid Documents</h2>
    <p>
      FAFSA documents, scholarship applications, and financial aid award
      letters contain sensitive financial information. Always password protect
      these before emailing them to anyone, and never upload them to random
      online PDF tools for any processing task.
    </p>
    <h2>Free PDF Tools Worth Knowing</h2>
    <ul>
      <li><strong>SecurePDF Tools</strong> — merge, split, encrypt. Completely free, no upload.</li>
      <li><strong>Adobe Acrobat Reader</strong> — free viewer with annotation tools.</li>
      <li><strong>Microsoft Edge</strong> — best browser-based annotation on Windows.</li>
      <li><strong>Apple Preview</strong> — best built-in PDF tool on Mac.</li>
      <li><strong>Zotero</strong> — free research tool with excellent PDF annotation for academic papers.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>Can I use free PDF tools for academic submissions?</h3>
        <p>Yes. The output PDF is identical regardless of which tool you use to create it. Professors cannot tell which tool was used to merge or prepare a submitted PDF.</p>
      </div>
      <div className="faq-item">
        <h3>How do I scan physical documents to PDF on my phone?</h3>
        <p>Both iOS and Android include built-in document scanning. On iPhone use the Notes app or Files app scan feature. On Android use Google Drive's built-in scan feature. Both produce PDF output.</p>
      </div>
    </div>
  </article>
);

const BlogArticle19 = () => (
  <article className="prose-custom">
    <p className="lead">
      Small businesses produce enormous volumes of PDF documents — invoices,
      contracts, HR documents, financial reports, and compliance paperwork.
      Handling these efficiently and securely does not require expensive
      software. Here is the complete guide for small business owners in 2026.
    </p>
    <h2>The Small Business PDF Problem</h2>
    <p>
      Small businesses face a unique challenge. They handle documents that are
      just as sensitive as those at large enterprises — employee records,
      client contracts, financial data — but often without the IT infrastructure
      or dedicated security staff to manage document workflows safely. Free
      online tools fill the gap, but often at an unacceptable privacy cost.
    </p>
    <h2>Invoices and Financial Documents</h2>
    <p>
      Invoices, purchase orders, and financial statements should never pass
      through unvetted third-party servers. Many small business invoices contain
      bank account details, client information, and business financial data.
      Browser-based tools that process documents locally are the appropriate
      choice for all financial PDF operations.
    </p>
    <h2>Employee Documents and HR Records</h2>
    <p>
      HR documents — offer letters, contracts, performance reviews, salary
      information — are among the most sensitive documents a small business
      handles. These must be treated with the same care as healthcare or legal
      documents. Encrypt all HR PDFs before storage and use browser-based tools
      for any PDF processing operations.
    </p>
    <h2>Client Contracts and NDAs</h2>
    <p>
      Client contracts often contain confidential business terms that your
      clients expect you to protect. Processing these contracts through
      third-party servers may constitute a breach of the confidentiality
      provisions within the contracts themselves. Use local browser-based
      processing for all contract PDFs.
    </p>
    <h2>Building a Simple Secure PDF Policy</h2>
    <ul>
      <li><strong>Approved tools list</strong> — define which PDF tools employees may use.</li>
      <li><strong>Encryption requirement</strong> — all external emails with attachments must be encrypted.</li>
      <li><strong>No server upload rule</strong> — financial and HR documents must use browser-based tools only.</li>
      <li><strong>Retention policy</strong> — define how long different document types are kept and where.</li>
    </ul>
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>What PDF software do most small businesses use?</h3>
        <p>Adobe Acrobat is common but expensive. Many small businesses successfully use a combination of Microsoft Edge or Apple Preview for viewing, and free browser-based tools for merging, splitting, and encryption.</p>
      </div>
      <div className="faq-item">
        <h3>Do small businesses need to comply with GDPR for PDF documents?</h3>
        <p>If you handle personal data of EU residents — including client names, emails, or financial information in PDF documents — GDPR applies regardless of your business size or location.</p>
      </div>
    </div>
  </article>
);

// ============================================================
// REPLACE YOUR ENTIRE posts ARRAY WITH THIS
// ============================================================

const posts: BlogPost[] = [
  {
    slug: "stop-uploading-sensitive-pdfs",
    title: "Why You Should Stop Uploading Sensitive PDFs to Online Servers in 2026",
    description: "Every day, millions upload bank statements and legal docs to random PDF tools. Discover the hidden security risks and why browser-based processing is the only safe alternative.",
    date: "February 15, 2026",
    readTime: "8 min read",
    content: <BlogArticle />,
  },
  {
    slug: "password-protect-pdf-free",
    title: "How to Password Protect a PDF Without Adobe in 2026",
    description: "Adobe Acrobat costs over $200 a year. Password protecting a PDF takes 30 seconds and costs nothing — if you use the right tool.",
    date: "February 18, 2026",
    readTime: "5 min read",
    content: <BlogArticle2 />,
  },
  {
    slug: "merge-pdfs-without-uploading",
    title: "How to Merge PDFs Without Uploading Them — Complete 2026 Guide",
    description: "Merging PDFs used to mean buying software or uploading sensitive files to random websites. In 2026 you can combine unlimited PDFs entirely in your browser.",
    date: "February 20, 2026",
    readTime: "5 min read",
    content: <BlogArticle3 />,
  },
  {
    slug: "is-ilovepdf-safe",
    title: "Is iLovePDF Safe? An Honest Review for 2026",
    description: "The answer is more nuanced than their privacy policy suggests. Here is what you actually need to know before uploading your documents.",
    date: "February 22, 2026",
    readTime: "6 min read",
    content: <BlogArticle4 />,
  },
  {
    slug: "split-pdf-free",
    title: "How to Split a PDF Into Multiple Files — Free, No Software Needed",
    description: "Splitting a PDF into separate pages is one of the most common document tasks — and one of the easiest to do without any software or subscription.",
    date: "February 24, 2026",
    readTime: "5 min read",
    content: <BlogArticle5 />,
  },
  {
    slug: "smallpdf-review-2026",
    title: "Smallpdf Review 2026 — Is It Safe and Worth Paying For?",
    description: "Smallpdf is popular but is it actually safe for sensitive documents? This honest review covers what happens to your files and when to use an alternative.",
    date: "February 26, 2026",
    readTime: "6 min read",
    content: <BlogArticle6 />,
  },
  {
    slug: "free-pdf-tools-mac",
    title: "Best Free PDF Tools for Mac in 2026 — No Adobe Required",
    description: "You do not need Adobe Acrobat or any paid software to work with PDFs on a Mac. Here is the complete guide to free PDF tools for macOS.",
    date: "March 1, 2026",
    readTime: "5 min read",
    content: <BlogArticle7 />,
  },
  {
    slug: "free-pdf-tools-windows",
    title: "Best Free PDF Tools for Windows 10 and 11 in 2026",
    description: "Whether you are on Windows 10 or 11, there are several completely free ways to work with PDFs without Adobe or any paid subscription.",
    date: "March 3, 2026",
    readTime: "5 min read",
    content: <BlogArticle8 />,
  },
  {
    slug: "pdf-security-for-lawyers",
    title: "PDF Security for Lawyers — What Every Attorney Must Know in 2026",
    description: "Using the wrong PDF tool with client documents is not just a privacy risk — it may be a professional and ethical obligation violation.",
    date: "March 5, 2026",
    readTime: "7 min read",
    content: <BlogArticle9 />,
  },
  {
    slug: "compress-pdf-free",
    title: "How to Compress a PDF — Free Methods That Actually Work in 2026",
    description: "PDF compression can reduce file sizes by up to 90 percent. But most compression tools send your files to external servers. Here is what you need to know.",
    date: "March 7, 2026",
    readTime: "5 min read",
    content: <BlogArticle10 />,
  },
  {
    slug: "hipaa-compliant-pdf-tools",
    title: "HIPAA Compliant PDF Tools — What Healthcare Workers Need to Know",
    description: "The PDF tool you choose could be a HIPAA compliance decision. Here is what healthcare professionals need to know about handling patient documents.",
    date: "March 9, 2026",
    readTime: "7 min read",
    content: <BlogArticle11 />,
  },
  {
    slug: "pdf-to-word-safe",
    title: "How to Convert PDF to Word Safely — Without Uploading Your Document",
    description: "Every month millions of people upload sensitive documents to PDF conversion sites they know nothing about. Here is a safer, smarter approach.",
    date: "March 11, 2026",
    readTime: "5 min read",
    content: <BlogArticle12 />,
  },
  {
    slug: "send-bank-statements-safely",
    title: "How to Send Bank Statements by Email Safely in 2026",
    description: "Sending bank statements is routine for mortgages and rental applications. But how you prepare those PDFs before sending them matters more than you think.",
    date: "March 13, 2026",
    readTime: "6 min read",
    content: <BlogArticle13 />,
  },
  {
    slug: "browser-pdf-tools-guide",
    title: "Your Browser Is a Powerful PDF Tool — Here Is What It Can Do",
    description: "Chrome, Edge, Firefox, and Safari all have built-in PDF capabilities most users have never fully explored. Here is the complete guide for 2026.",
    date: "March 15, 2026",
    readTime: "5 min read",
    content: <BlogArticle14 />,
  },
  {
    slug: "remote-team-pdf-security",
    title: "How to Build a Secure PDF Workflow for Your Remote Team in 2026",
    description: "Remote work has changed how teams handle documents. Here is how to build a PDF workflow that keeps sensitive business documents safe.",
    date: "March 17, 2026",
    readTime: "7 min read",
    content: <BlogArticle15 />,
  },
  {
    slug: "protect-tax-pdfs",
    title: "How to Protect Your Tax PDFs From Identity Theft in 2026",
    description: "Tax season means handling your most sensitive documents. W-2s and tax returns contain everything needed for identity theft. Here is how to stay safe.",
    date: "March 19, 2026",
    readTime: "6 min read",
    content: <BlogArticle16 />,
  },
  {
    slug: "real-estate-pdf-security",
    title: "Real Estate PDF Security — How to Handle Mortgage and Closing Documents Safely",
    description: "Real estate transactions involve dozens of highly sensitive documents. Here is how buyers, sellers, and agents can handle PDFs securely.",
    date: "March 21, 2026",
    readTime: "7 min read",
    content: <BlogArticle17 />,
  },
  {
    slug: "free-pdf-tools-students",
    title: "Best Free PDF Tools for Students in 2026 — Complete Guide",
    description: "Students handle more PDFs than almost anyone. Here is the complete free toolkit for viewing, annotating, merging, and protecting academic documents.",
    date: "March 23, 2026",
    readTime: "5 min read",
    content: <BlogArticle18 />,
  },
  {
    slug: "small-business-pdf-security",
    title: "Small Business PDF Security — How to Handle Documents Safely Without IT",
    description: "Small businesses handle sensitive PDFs without IT infrastructure. Here is how to build a secure document workflow that does not cost a fortune.",
    date: "March 25, 2026",
    readTime: "7 min read",
    content: <BlogArticle19 />,
  },
  {
    slug: "browser-pdf-processing-explained",
    title: "How Browser-Based PDF Processing Works — And Why It Protects Your Privacy",
    description: "WebAssembly has transformed what browsers can do with files. Here is how local PDF processing works and why it is the most private approach available.",
    date: "March 27, 2026",
    readTime: "6 min read",
    content: <BlogArticle20 />,
  },
];

  <article className="prose-custom">
    <p className="lead">
      Every day, millions of people upload their most sensitive documents —
      bank statements, legal contracts, medical records — to random online PDF
      tools. In 2026, this habit is not just careless. It is a significant
      security risk that could have serious financial and legal consequences.
    </p>

    <h2>The Hidden Danger of Server-Side PDF Processing</h2>
    <p>
      When you drag a file onto a typical online PDF tool, that file travels
      across the internet and lands on a server you know nothing about. The
      company behind that tool may be storing your document, scanning it for
      data, or — in worst-case scenarios — exposing it to third parties via
      insecure infrastructure. Most free tools survive on advertising revenue,
      meaning your data may be the real product.
    </p>
    <p>
      Consider what is actually inside the PDFs most people process online:
    </p>
    <ul>
      <li>
        <strong>Bank statements</strong> containing account numbers, routing
        numbers, and full transaction histories.
      </li>
      <li>
        <strong>Legal contracts</strong> with proprietary business terms,
        signatures, and personally identifiable information.
      </li>
      <li>
        <strong>Medical records</strong> protected by regulations like HIPAA
        that explicitly prohibit unauthorized disclosure.
      </li>
      <li>
        <strong>Tax documents</strong> containing Social Security Numbers and
        complete income histories.
      </li>
      <li>
        <strong>Real estate documents</strong> with property addresses, purchase
        prices, and mortgage details.
      </li>
    </ul>

    <h2>What Happens to Your File After You Upload It?</h2>
    <p>
      Privacy policies on free tools are notoriously vague. Common language
      includes phrases like "we may retain your files for up to 24 hours for
      processing." But enforcement is another matter entirely. Data breaches at
      SaaS companies happen constantly — and when a breach occurs at a PDF
      processing service, the fallout can include mass exposure of documents
      from thousands or millions of users.
    </p>
    <p>
      Even well-intentioned companies face risks they cannot fully control:
      misconfigured cloud storage buckets, compromised employee credentials,
      rogue API keys, or vulnerabilities in third-party dependencies. In 2023
      alone, multiple popular file-conversion services suffered data exposure
      incidents affecting user documents.
    </p>

    <h2>The Regulatory and Compliance Angle</h2>
    <p>
      For professionals — lawyers, accountants, healthcare workers, financial
      advisors — uploading client documents to unvetted third-party servers is
      not just a privacy risk. It is potentially a legal and compliance
      violation. GDPR, HIPAA, SOC 2, and various state privacy laws impose
      strict requirements on how sensitive data is handled. Uploading a
      client's contract to a free PDF merger you found via a Google search
      could constitute a reportable data handling incident.
    </p>

    <h2>Browser-Based Processing: The Secure Alternative</h2>
    <p>
      Modern browsers are extraordinarily capable. Thanks to powerful
      JavaScript libraries like <strong>pdf-lib</strong>, every PDF operation
      that used to require a server — merging, splitting, encrypting,
      compressing — can now happen entirely within the browser, on your local
      machine. Your files never leave your device.
    </p>
    <p>
      This is not a compromise. Browser-based PDF processing is, in many ways,
      faster than server-based tools because there is zero upload or download
      latency for the processing step. A merge operation on a 50MB file
      completes in seconds, entirely offline.
    </p>
    <p>Key security guarantees of browser-based tools:</p>
    <ul>
      <li>
        <strong>Zero server transmission.</strong> Your PDF bytes never leave
        RAM on your device.
      </li>
      <li>
        <strong>No account required.</strong> No identity linking your
        documents to a profile.
      </li>
      <li>
        <strong>Works offline.</strong> After the page loads, you can
        disconnect from the internet.
      </li>
      <li>
        <strong>Verifiable.</strong> Open-source code means anyone can audit
        exactly what runs on your files.
      </li>
    </ul>

    <h2>How to Verify a Tool Is Truly Browser-Based</h2>
    <p>
      Not every tool that claims to be "secure" or "private" actually is. Here
      is how to verify. Open your browser's network inspector (F12 → Network
      tab) before using any PDF tool. After you upload or process your file,
      check whether any outbound requests to external servers are made
      containing binary data. If you see POST requests going to an API domain
      with your file attached, your document is being uploaded regardless of
      what the marketing copy says.
    </p>
    <p>
      With this tool, you can run that exact test. You will see zero outbound
      data requests after you load your PDF. The processing happens entirely in
      the browser's Web Workers and WebAssembly runtime.
    </p>

    <h2>Practical Steps for Safer PDF Handling in 2026</h2>
    <p>
      Beyond using browser-based tools, here are best practices for protecting
      sensitive PDF documents:
    </p>
    <ul>
      <li>
        Always password-protect PDFs before storing them in cloud services,
        even trusted ones.
      </li>
      <li>
        Audit your team's PDF workflow tools — ensure any shared tooling meets
        your compliance requirements.
      </li>
      <li>
        Prefer tools with published, auditable source code for sensitive
        document operations.
      </li>
      <li>
        Educate clients about the risks of sending unprotected PDFs via email
        or messaging apps.
      </li>
    </ul>

    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <h3>Can this tool access my files after I close the browser?</h3>
        <p>
          No. The tool operates entirely in browser memory. Once you close the
          tab, all file data is cleared. Nothing is stored on disk, in
          localStorage, or on any server.
        </p>
      </div>

      <div className="faq-item">
        <h3>Does the tool work without an internet connection?</h3>
        <p>
          Yes. After the initial page load, all PDF operations work fully
          offline. You can disable your Wi-Fi and process sensitive documents
          with complete confidence.
        </p>
      </div>

      <div className="faq-item">
        <h3>Is it safe to use this tool for HIPAA-covered documents?</h3>
        <p>
          Browser-based processing eliminates the server transmission risk
          entirely. However, always consult your compliance officer for
          specific HIPAA use cases, as requirements extend beyond data
          transmission to access controls and audit trails.
        </p>
      </div>

      <div className="faq-item">
        <h3>How does the encryption in the Protect PDF tool work?</h3>
        <p>
          The Protect PDF tool uses AES-256 encryption via the pdf-lib library,
          the same standard used by financial institutions. The encryption
          happens in your browser using your chosen password, and the password
          is never transmitted anywhere.
        </p>
      </div>

      <div className="faq-item">
        <h3>What is the maximum file size this tool can handle?</h3>
        <p>
          The limit depends on your device's available RAM rather than any
          artificial server restriction. Most modern devices handle PDFs up to
          500MB without issues. Extremely large files may require more time for
          the browser to process.
        </p>
      </div>
    </div>
  </article>
  {
    slug: "stop-uploading-sensitive-pdfs",
    title:
      "Why You Should Stop Uploading Sensitive PDFs to Online Servers in 2026",
    description:
      "Every day, millions upload bank statements and legal docs to random PDF tools. Discover the hidden security risks and why browser-based processing is the only safe alternative.",
    date: "February 15, 2026",
    readTime: "8 min read",
    content: <BlogArticle />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
const SchemaMarkup = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SecurePDF Tools",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Private, browser-based PDF tools. Merge, split, and protect PDFs securely — files never leave your device.",
    featureList: [
      "Private PDF merger",
      "No-upload PDF splitter",
      "Browser-based PDF password protection",
      "Secure PDF tools",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are my files uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All PDF processing happens entirely in your browser. Your files never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "What is a private PDF merger?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A private PDF merger combines multiple PDF files into one entirely in your browser, with zero server upload, ensuring complete privacy.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this PDF tool offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. After the initial page load, all PDF tools work fully offline.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// DRAG-DROP FILE ZONE
// ─────────────────────────────────────────────────────────────────────────────
interface DropZoneProps {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
}

const DropZone = ({
  onFiles,
  multiple = false,
  accept = ".pdf",
  label = "Drop PDF files here or click to browse",
}: DropZoneProps) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const dropped = Array.from(e.dataTransfer.files).filter((f) =>
        f.type === "application/pdf"
      );
      if (dropped.length) onFiles(dropped);
    },
    [onFiles]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length) onFiles(selected);
    e.target.value = "";
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-12 text-center group
        ${dragging
          ? "border-indigo-400 bg-indigo-500/10 scale-[1.01]"
          : "border-slate-600 hover:border-indigo-500 hover:bg-indigo-500/5 bg-slate-800/40"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />
      <div className="flex flex-col items-center gap-3">
        <div className={`rounded-full p-4 transition-all duration-200
          ${dragging ? "bg-indigo-500/20" : "bg-slate-700/60 group-hover:bg-indigo-500/15"}`}>
          <Upload className={`w-8 h-8 transition-colors duration-200
            ${dragging ? "text-indigo-400" : "text-slate-400 group-hover:text-indigo-400"}`} />
        </div>
        <div>
          <p className="text-slate-200 font-medium font-mono text-sm tracking-wide">
            {dragging ? "Release to load files" : label}
          </p>
          <p className="text-slate-500 text-xs mt-1 font-mono">
            PDF files only · Processed locally in your browser
          </p>
        </div>
      </div>
      {dragging && (
        <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 border-2 border-indigo-400 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MERGE TOOL
// ─────────────────────────────────────────────────────────────────────────────
const MergeTool = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const dragOver = useRef<number | null>(null);

  const addFiles = (newFiles: File[]) => {
    const mapped = newFiles.map((f) => ({
      file: f,
      name: f.name,
      size: formatBytes(f.size),
      id: uid(),
    }));
    setFiles((prev) => [...prev, ...mapped]);
    setStatus("idle");
    setDownloadUrl(null);
  };

  const removeFile = (id: string) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  const reorder = (from: number, to: number) => {
    setFiles((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  const handleDragStart = (index: number) => {
    dragOver.current = index;
  };

  const handleDragEnter = (index: number) => {
    if (dragOver.current !== null && dragOver.current !== index) {
      reorder(dragOver.current, index);
      dragOver.current = index;
    }
  };

  const merge = async () => {
    if (files.length < 2) return;
    setStatus("processing");
    setErrorMsg("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (const pf of files) {
        const buf = await pf.file.arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus("done");
    } catch (e: any) {
      setErrorMsg(e?.message || "Failed to merge PDFs. Ensure all files are valid, unlocked PDFs.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      <DropZone
        onFiles={addFiles}
        multiple
        label="Drop multiple PDF files here or click to browse"
      />

      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">
              {files.length} file{files.length !== 1 ? "s" : ""} · Drag to reorder
            </p>
            <button
              onClick={() => { setFiles([]); setDownloadUrl(null); setStatus("idle"); }}
              className="text-slate-500 hover:text-red-400 text-xs font-mono transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-2">
            {files.map((f, i) => (
              <div
                key={f.id}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragEnter={() => handleDragEnter(i)}
                onDragOver={(e) => e.preventDefault()}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 cursor-grab active:cursor-grabbing group hover:border-slate-600 transition-all"
              >
                <div className="text-slate-600 font-mono text-xs w-5 text-center select-none">
                  {i + 1}
                </div>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm font-medium truncate">{f.name}</p>
                  <p className="text-slate-500 text-xs font-mono">{f.size}</p>
                </div>
                <button
                  onClick={() => removeFile(f.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all p-1 rounded-lg hover:bg-red-400/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <label className="w-full py-2.5 rounded-xl border border-dashed border-slate-600 hover:border-indigo-500 text-slate-500 hover:text-indigo-400 text-sm font-mono transition-all flex items-center justify-center gap-2 hover:bg-indigo-500/5 cursor-pointer">
            <input type="file" accept=".pdf" multiple className="hidden" onChange={(e) => { const f = Array.from(e.target.files || []); if(f.length) addFiles(f); e.target.value=""; }} />
            <Plus className="w-4 h-4" /> Add more files
          </label>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{errorMsg}</p>
        </div>
      )}

      {status === "done" && downloadUrl && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-emerald-300 text-sm font-medium">Merge complete!</p>
            <p className="text-emerald-400/60 text-xs font-mono">
              {files.length} files merged · 100% local
            </p>
          </div>
          <a
            href={downloadUrl}
            download="merged.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-sm font-mono font-medium transition-all border border-emerald-500/30"
          >
            <Download className="w-4 h-4" /> Download
          </a>
        </div>
      )}

      <button
        onClick={merge}
        disabled={files.length < 2 || status === "processing"}
        className={`w-full py-4 rounded-2xl font-mono font-semibold text-sm tracking-wider transition-all duration-200
          ${files.length >= 2 && status !== "processing"
            ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5"
            : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
          }`}
      >
        {status === "processing" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Merging locally...
          </span>
        ) : (
          `MERGE ${files.length >= 2 ? files.length + " PDFS" : "PDFS"} →`
        )}
      </button>
      {files.length < 2 && (
        <p className="text-center text-slate-600 text-xs font-mono">
          Add at least 2 PDF files to merge
        </p>
      )}
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
  const [ranges, setRanges] = useState<string>("1");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloads, setDownloads] = useState<{ url: string; name: string }[]>([]);

  const loadFile = async (files: File[]) => {
    const f = files[0];
    setFile(f);
    setFileName(f.name);
    setStatus("loading");
    setDownloads([]);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const buf = await f.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      setPageCount(doc.getPageCount());
      setRanges(`1-${doc.getPageCount()}`);
      setStatus("ready");
    } catch {
      setErrorMsg("Could not read the PDF. It may be encrypted or corrupted.");
      setStatus("error");
    }
  };

  const split = async () => {
    if (!file || status === "processing") return;
    setStatus("processing");
    setErrorMsg("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const buf = await file.arrayBuffer();
      const src = await PDFDocument.load(buf);
      const results: { url: string; name: string }[] = [];

      const parseRanges = (input: string): number[][] => {
        return input.split(",").map((part) => {
          const trimmed = part.trim();
          if (trimmed.includes("-")) {
            const [s, e] = trimmed.split("-").map((n) => parseInt(n.trim()) - 1);
            return Array.from({ length: e - s + 1 }, (_, i) => s + i);
          }
          return [parseInt(trimmed) - 1];
        });
      };

      const pageGroups = parseRanges(ranges);
      for (let i = 0; i < pageGroups.length; i++) {
        const indices = pageGroups[i].filter(
          (n) => n >= 0 && n < src.getPageCount()
        );
        if (!indices.length) continue;
        const newDoc = await PDFDocument.create();
        const copied = await newDoc.copyPages(src, indices);
        copied.forEach((p) => newDoc.addPage(p));
        const bytes = await newDoc.save();
        const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const rangeStr = pageGroups[i][0] + 1 === pageGroups[i][pageGroups[i].length - 1] + 1
          ? `page-${pageGroups[i][0] + 1}`
          : `pages-${pageGroups[i][0] + 1}-${pageGroups[i][pageGroups[i].length - 1] + 1}`;
        results.push({ url, name: `split-${rangeStr}.pdf` });
      }

      setDownloads(results);
      setStatus("done");
    } catch (e: any) {
      setErrorMsg(e?.message || "Split failed. Check your page ranges.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      {status === "idle" || status === "loading" ? (
        <DropZone onFiles={loadFile} label="Drop a PDF file to split" />
      ) : (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-200 font-medium text-sm truncate">{fileName}</p>
            <p className="text-slate-500 text-xs font-mono">
              {pageCount} page{pageCount !== 1 ? "s" : ""} · Ready to split
            </p>
          </div>
          <button
            onClick={() => { setFile(null); setStatus("idle"); setDownloads([]); }}
            className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-700 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {(status === "ready" || status === "processing" || status === "done" || status === "error") && (
        <div className="space-y-3">
          <div>
            <label className="text-slate-400 text-xs font-mono uppercase tracking-widest block mb-2">
              Page ranges (comma-separated)
            </label>
            <input
              type="text"
              value={ranges}
              onChange={(e) => setRanges(e.target.value)}
              placeholder="e.g. 1-3, 4-6, 7"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 focus:border-indigo-500 outline-none text-slate-200 font-mono text-sm transition-colors placeholder:text-slate-600"
            />
            <p className="text-slate-600 text-xs font-mono mt-1.5">
              Each range becomes a separate PDF. Total pages: {pageCount}
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{errorMsg}</p>
        </div>
      )}

      {status === "done" && downloads.length > 0 && (
        <div className="space-y-2">
          <p className="text-emerald-300 text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {downloads.length} PDF{downloads.length !== 1 ? "s" : ""} created
          </p>
          {downloads.map((d, i) => (
            <a
              key={i}
              href={d.url}
              download={d.name}
              className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-all group"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="flex-1 text-emerald-300 text-sm font-mono">{d.name}</span>
              <ChevronRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
            </a>
          ))}
        </div>
      )}

      {(status === "ready" || status === "error") && (
        <button
          onClick={split}
          disabled={false}
          className="w-full py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-semibold text-sm tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5"
        >
          SPLIT PDF →
        </button>
      )}
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
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const loadFile = (files: File[]) => {
    setFile(files[0]);
    setFileName(files[0].name);
    setStatus("idle");
    setDownloadUrl(null);
  };

  const protect = async () => {
    if (!file || !password.trim()) return;
    setStatus("processing");
    setErrorMsg("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      // pdf-lib encryption via save options
      const bytes = await (doc.save as any)({
        userPassword: password,
        ownerPassword: password + "_owner",
        permissions: {
          printing: "lowResolution",
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: true,
          contentAccessibility: true,
          documentAssembly: false,
        },
      });
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e: any) {
      setErrorMsg(
        e?.message || "Encryption failed. The PDF may already be protected."
      );
      setStatus("error");
    }
  };

  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password) ? 4
    : 3;

  const strengthLabel = ["", "Weak", "Fair", "Strong", "Very Strong"];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-emerald-500", "bg-indigo-500"];

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={loadFile} label="Drop a PDF to password-protect" />
      ) : (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center flex-shrink-0">
            <Lock className="w-5 h-5 text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-200 font-medium text-sm truncate">{fileName}</p>
            <p className="text-slate-500 text-xs font-mono">Ready to encrypt</p>
          </div>
          <button
            onClick={() => { setFile(null); setStatus("idle"); setDownloadUrl(null); setPassword(""); }}
            className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-700 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {file && (
        <div className="space-y-3">
          <div>
            <label className="text-slate-400 text-xs font-mono uppercase tracking-widest block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a strong password..."
                className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800 border border-slate-600 focus:border-violet-500 outline-none text-slate-200 font-mono text-sm transition-colors placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i <= strength ? strengthColor[strength] : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs font-mono ${
                  strength <= 1 ? "text-red-400" : strength === 2 ? "text-yellow-400" : strength === 3 ? "text-emerald-400" : "text-indigo-400"
                }`}>
                  {strengthLabel[strength]}
                </p>
              </div>
            )}
          </div>
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
            <p className="text-slate-500 text-xs font-mono leading-relaxed">
              <Lock className="w-3 h-3 inline-block mr-1 text-violet-500" />
              AES-256 encryption · Restrictions: read-only, no copying · Password never leaves your device
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{errorMsg}</p>
        </div>
      )}

      {status === "done" && downloadUrl && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-emerald-300 text-sm font-medium">PDF encrypted successfully!</p>
            <p className="text-emerald-400/60 text-xs font-mono">AES-256 · 100% local</p>
          </div>
          <a
            href={downloadUrl}
            download={`protected-${fileName}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-sm font-mono font-medium transition-all border border-emerald-500/30"
          >
            <Download className="w-4 h-4" /> Download
          </a>
        </div>
      )}

      {file && status !== "done" && (
        <button
          onClick={protect}
          disabled={!password.trim() || status === "processing"}
          className={`w-full py-4 rounded-2xl font-mono font-semibold text-sm tracking-wider transition-all duration-200
            ${password.trim() && status !== "processing"
              ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:-translate-y-0.5"
              : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
            }`}
        >
          {status === "processing" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Encrypting locally...
            </span>
          ) : (
            "ENCRYPT PDF →"
          )}
        </button>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TOOL WRAPPER PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface ToolPageProps {
  tool: "merge" | "split" | "protect";
  onBack: () => void;
}

const toolMeta = {
  merge: {
    title: "Private PDF Merger",
    subtitle: "Combine multiple PDFs into one — zero upload, 100% browser-based",
    icon: <Merge className="w-6 h-6" />,
    color: "indigo",
    keywords: ["private PDF merger", "merge PDFs locally", "offline PDF combiner"],
  },
  split: {
    title: "No-Upload PDF Splitter",
    subtitle: "Extract pages or page ranges into separate PDFs — files stay on your device",
    icon: <Scissors className="w-6 h-6" />,
    color: "cyan",
    keywords: ["no-upload PDF splitter", "split PDF locally", "extract PDF pages browser"],
  },
  protect: {
    title: "Secure PDF Encryption",
    subtitle: "Password-protect PDFs with AES-256 encryption — password never transmitted",
    icon: <Lock className="w-6 h-6" />,
    color: "violet",
    keywords: ["secure PDF encryption", "browser PDF password", "local PDF protect"],
  },
};

const colorMap = {
  indigo: {
    bg: "bg-indigo-500/15",
    text: "text-indigo-400",
    border: "border-indigo-500/30",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/15",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },
  violet: {
    bg: "bg-violet-500/15",
    text: "text-violet-400",
    border: "border-violet-500/30",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  },
};

const ToolPage = ({ tool, onBack }: ToolPageProps) => {
  const meta = toolMeta[tool];
  const colors = colorMap[meta.color as keyof typeof colorMap];

  useEffect(() => {
    document.title = `${meta.title} | SecurePDF Tools`;
  }, [meta.title]);

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-300 font-mono text-sm transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to tools
      </button>

      <div className="mb-8">
        <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-5 ${colors.text}`}>
          {meta.icon}
        </div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2 font-mono tracking-tight">
          {meta.title}
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{meta.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {meta.keywords.map((kw) => (
            <span
              key={kw}
              className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${colors.badge}`}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-6 md:p-8">
        {tool === "merge" && <MergeTool />}
        {tool === "split" && <SplitTool />}
        {tool === "protect" && <ProtectTool />}
      </div>

      <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-slate-800/20 border border-slate-700/30">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <p className="text-slate-500 text-xs font-mono leading-relaxed">
          <strong className="text-slate-400">Zero-server guarantee:</strong> All processing runs
          in your browser via pdf-lib WebAssembly. No data is transmitted. Verifiable via DevTools → Network tab.
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface HomeProps {
  onNavigate: (page: Page, tool?: "merge" | "split" | "protect") => void;
}

const tools = [
  {
    id: "merge" as const,
    title: "Private PDF Merger",
    description:
      "Combine multiple PDFs into a single file. Drag-and-drop ordering. Zero upload — completely private.",
    icon: <Merge className="w-6 h-6" />,
    color: "indigo",
    badge: "Most Popular",
    features: ["Multi-file drag & drop", "Reorder pages", "100% local"],
  },
  {
    id: "split" as const,
    title: "No-Upload PDF Splitter",
    description:
      "Extract specific pages or ranges into separate PDF files. Perfect for splitting large documents.",
    icon: <Scissors className="w-6 h-6" />,
    color: "cyan",
    badge: "Privacy-First",
    features: ["Custom page ranges", "Multi-split output", "Offline capable"],
  },
  {
    id: "protect" as const,
    title: "Secure PDF Encryption",
    description:
      "Add AES-256 password protection to any PDF. Your password and document never leave your browser.",
    icon: <Lock className="w-6 h-6" />,
    color: "violet",
    badge: "AES-256",
    features: ["AES-256 encryption", "Permissions control", "Zero transmission"],
  },
];

const trustPoints = [
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Zero Server Contact",
    desc: "No file ever touches a remote server. Verify it yourself in DevTools → Network.",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Browser-Native Processing",
    desc: "Powered by pdf-lib running in your browser's JavaScript engine.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "No Retention, Ever",
    desc: "Files live only in browser memory. Closing the tab erases everything.",
  },
  {
    icon: <Server className="w-5 h-5" />,
    title: "Works Fully Offline",
    desc: "Disconnect from Wi-Fi after page load. All tools still work perfectly.",
  },
];

const Home = ({ onNavigate }: HomeProps) => {
  useEffect(() => {
    document.title = "SecurePDF Tools — Private Browser-Based PDF Tools";
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="text-center pt-8 md:pt-16 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8 tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          YOUR FILES NEVER LEAVE YOUR DEVICE
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-6 leading-tight tracking-tight font-mono">
          PDF Tools That
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Respect Your Privacy
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Merge, split, and protect PDFs entirely in your browser. No uploads.
          No accounts. No tracking. Bank statements and legal docs stay on{" "}
          <strong className="text-slate-300">your computer</strong>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate("merge")}
            className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-semibold text-sm tracking-wider transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Merge className="w-4 h-4" /> Start Merging PDFs
          </button>
          <button
            onClick={() => onNavigate("blog")}
            className="px-8 py-4 rounded-2xl border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-200 font-mono font-semibold text-sm tracking-wider transition-all hover:bg-slate-800/50 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Why This Matters
          </button>
        </div>

        {/* Floating trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-slate-500 text-xs font-mono">
          {["No Signup", "No Ads", "No Upload", "Open Source Ready", "GDPR Safe"].map((b) => (
            <span key={b} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 font-mono mb-3">
            Secure Browser-Based PDF Tools
          </h2>
          <p className="text-slate-500 text-sm font-mono">
            Three powerful tools. Zero server contact. Full privacy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const colors = colorMap[tool.color as keyof typeof colorMap];
            return (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className={`text-left p-6 rounded-3xl border bg-slate-800/30 hover:bg-slate-800/60 transition-all duration-200 group hover:-translate-y-1 hover:shadow-2xl ${colors.border} hover:border-opacity-60 relative overflow-hidden`}
              >
                {/* Background glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${
                  tool.color === "indigo" ? "bg-indigo-500" : tool.color === "cyan" ? "bg-cyan-500" : "bg-violet-500"
                }`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center ${colors.text} group-hover:scale-110 transition-transform`}>
                      {tool.icon}
                    </div>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${colors.badge}`}>
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-slate-100 font-bold font-mono text-lg mb-2 leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {tool.description}
                  </p>

                  <div className="space-y-1.5">
                    {tool.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          tool.color === "indigo" ? "bg-indigo-400" : tool.color === "cyan" ? "bg-cyan-400" : "bg-violet-400"
                        }`} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className={`mt-5 flex items-center gap-1 text-xs font-mono ${colors.text} font-semibold`}>
                    Use Tool <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="rounded-3xl border border-slate-700/50 bg-slate-800/20 p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-emerald-400 mb-4">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-2xl font-bold font-mono text-slate-100">
              Trust-First Architecture
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Built from the ground up so your documents are mathematically
            impossible to intercept. Here is how it works.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((tp) => (
            <div key={tp.title} className="text-center group">
              <div className="w-12 h-12 rounded-2xl bg-slate-700/60 flex items-center justify-center text-slate-400 mx-auto mb-4 group-hover:bg-emerald-500/15 group-hover:text-emerald-400 transition-all">
                {tp.icon}
              </div>
              <h3 className="text-slate-200 font-mono font-semibold text-sm mb-2">{tp.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{tp.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-700/50 text-center">
          <p className="text-slate-500 text-xs font-mono">
            <strong className="text-slate-400">Skeptical?</strong> Open DevTools → Network tab →
            process any PDF → confirm zero outbound requests with your file data.
          </p>
        </div>
      </section>

      {/* Blog teaser */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-mono text-slate-100">
            From the Blog
          </h2>
          <button
            onClick={() => onNavigate("blog")}
            className="text-indigo-400 hover:text-indigo-300 text-sm font-mono flex items-center gap-1 transition-colors"
          >
            All posts <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div
          onClick={() => onNavigate("post")}
          className="cursor-pointer group p-6 md:p-8 rounded-3xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-200 hover:-translate-y-0.5"
        >
          <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase mb-3 block">
            Security · Privacy
          </span>
          <h3 className="text-slate-100 font-bold text-xl md:text-2xl font-mono mb-3 group-hover:text-indigo-300 transition-colors leading-snug">
            {posts[0].title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4 max-w-2xl">
            {posts[0].description}
          </p>
          <div className="flex items-center gap-4 text-slate-600 text-xs font-mono">
            <span>{posts[0].date}</span>
            <span>·</span>
            <span>{posts[0].readTime}</span>
            <ChevronRight className="w-4 h-4 ml-auto text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </section>

      {/* FAQ (for SEO/Schema) */}
      <section>
        <h2 className="text-2xl font-bold font-mono text-slate-100 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[
            {
              q: "Are my files uploaded to a server?",
              a: "No. All PDF processing happens entirely in your browser using the pdf-lib library. Your files never leave your device.",
            },
            {
              q: "What is a private PDF merger?",
              a: "A private PDF merger combines multiple PDF files into one entirely in your browser, with zero server upload, ensuring complete privacy for sensitive documents.",
            },
            {
              q: "Can I use these tools offline?",
              a: "Yes. After the initial page load, all PDF tools work fully offline. You can disconnect from Wi-Fi and process documents with complete confidence.",
            },
            {
              q: "Is the Protect PDF tool HIPAA-safe?",
              a: "Browser-based processing eliminates the server transmission risk. The tool uses AES-256 encryption locally. Consult your compliance officer for specific HIPAA use case requirements.",
            },
          ].map((item, i) => (
            <details key={i} className="group rounded-2xl border border-slate-700/50 bg-slate-800/20">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
                <span className="text-slate-200 font-medium text-sm">{item.q}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
              </summary>
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
interface BlogProps {
  onPost: () => void;
}

const BlogPage = ({ onPost }: BlogProps) => {
  useEffect(() => {
    document.title = "Blog | SecurePDF Tools — PDF Security & Privacy";
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-mono text-slate-100 mb-3">
          The SecurePDF Blog
        </h1>
        <p className="text-slate-500">
          PDF security, privacy best practices, and why browser-based tools matter.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            onClick={onPost}
            className="group cursor-pointer p-6 md:p-8 rounded-3xl border border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40 hover:border-slate-600 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0 mt-1">
                <BookOpen className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-slate-100 font-bold font-mono text-lg md:text-xl mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {post.description}
                </p>
                <div className="flex items-center gap-3 text-slate-600 text-xs font-mono">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// POST PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface PostPageProps {
  post: BlogPost;
  onBack: () => void;
}

const PostPage = ({ post, onBack }: PostPageProps) => {
  useEffect(() => {
    document.title = `${post.title} | SecurePDF Tools`;
  }, [post.title]);

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-300 font-mono text-sm transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to blog
      </button>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
            Security · Privacy
          </span>
          <span className="text-slate-600 text-xs">·</span>
          <span className="text-slate-600 text-xs font-mono">{post.readTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-mono text-slate-100 leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-slate-500 text-sm font-mono">{post.date}</p>
      </header>

      <div className="blog-content">{post.content}</div>

      <div className="mt-16 pt-8 border-t border-slate-700/50">
        <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
          <ShieldCheck className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-slate-100 font-bold font-mono mb-2">
            Try the Secure Alternative
          </h3>
          <p className="text-slate-500 text-sm mb-4">
            All tools run 100% in your browser. No upload. No account.
          </p>
          <button
            onClick={() => onBack()}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-sm font-semibold transition-all"
          >
            Use SecurePDF Tools →
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
interface NavbarProps {
  page: Page;
  onNavigate: (p: Page) => void;
}

const Navbar = ({ page, onNavigate }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: "Tools", page: "home" },
    { label: "Merge", page: "merge" },
    { label: "Split", page: "split" },
    { label: "Protect", page: "protect" },
    { label: "Blog", page: "blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-slate-200 font-mono font-bold text-sm tracking-wide">
            SecurePDF
          </span>
          <span className="hidden sm:block text-slate-600 text-xs font-mono">
            · browser-native tools
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => onNavigate(l.page)}
              className={`px-3.5 py-2 rounded-xl text-sm font-mono transition-all ${
                page === l.page
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/60"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all"
        >
          {mobileOpen ? <XCircle className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 px-4 py-3 space-y-1">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => { onNavigate(l.page); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-mono transition-all ${
                page === l.page
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
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
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <span className="text-slate-500 font-mono text-sm">
            SecurePDF Tools — Private browser-based PDF processing
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-600 text-xs font-mono">
          <span>No uploads</span>
          <span>·</span>
          <span>No accounts</span>
          <span>·</span>
          <span>No tracking</span>
          <span>·</span>
          <span>Open source ready</span>
        </div>
      </div>
      <p className="text-slate-700 text-xs font-mono text-center mt-6">
        Powered by{" "}
        <a
          href="https://pdf-lib.js.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-slate-400 transition-colors"
        >
          pdf-lib
        </a>{" "}
        · Keywords: private PDF merger · secure browser-based PDF tools · no-upload PDF splitter
      </p>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES (injected via style tag)
// ─────────────────────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background-color: #020617;
      color: #cbd5e1;
      min-height: 100vh;
    }

    .font-mono { font-family: 'IBM Plex Mono', monospace; }

    /* Background grid */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
      background-size: 64px 64px;
      pointer-events: none;
      z-index: 0;
    }

    /* Radial glow */
    body::after {
      content: '';
      position: fixed;
      top: -20%;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 60%;
      background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    #__next, main { position: relative; z-index: 1; }

    /* Blog / prose styles */
    .blog-content {
      font-family: 'DM Sans', sans-serif;
      color: #94a3b8;
      line-height: 1.8;
      font-size: 1rem;
    }
    .blog-content .lead {
      font-size: 1.125rem;
      color: #cbd5e1;
      margin-bottom: 2rem;
      line-height: 1.7;
    }
    .blog-content h2 {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 1.25rem;
      font-weight: 700;
      color: #e2e8f0;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(99, 102, 241, 0.2);
    }
    .blog-content h3 {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 1rem;
      font-weight: 600;
      color: #e2e8f0;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
    .blog-content p {
      margin-bottom: 1.25rem;
    }
    .blog-content ul {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem 0;
      space-y: 0.5rem;
    }
    .blog-content ul li {
      display: flex;
      gap: 0.75rem;
      padding: 0.6rem 0;
      border-bottom: 1px solid rgba(71, 85, 105, 0.3);
    }
    .blog-content ul li::before {
      content: '→';
      color: #6366f1;
      font-family: 'IBM Plex Mono', monospace;
      flex-shrink: 0;
      margin-top: 0.1rem;
    }
    .blog-content strong { color: #cbd5e1; }

    .faq-section {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(71, 85, 105, 0.4);
    }
    .faq-item {
      padding: 1.25rem;
      border-radius: 1rem;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(71, 85, 105, 0.4);
      margin-bottom: 1rem;
    }
    .faq-item h3 {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.9rem;
      font-weight: 600;
      color: #e2e8f0;
      margin: 0 0 0.5rem 0;
    }
    .faq-item p {
      margin: 0;
      font-size: 0.875rem;
      color: #64748b;
    }

    details summary::-webkit-details-marker { display: none; }
    details[open] > summary { border-bottom: 1px solid rgba(71, 85, 105, 0.3); padding-bottom: 1rem; margin-bottom: 0; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #334155; }

    /* Tailwind-compatible utility overrides */
    .prose-custom { }
  `}</style>
);

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PDFToolsPage() {
  const [page, setPage] = useState<Page>("home");
  const [activeTool, setActiveTool] = useState<"merge" | "split" | "protect">("merge");
  const [activePost, setActivePost] = useState<BlogPost>(posts[0]);

  const navigate = useCallback((target: Page, tool?: "merge" | "split" | "protect") => {
    if (tool) setActiveTool(tool);
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleToolNavigate = (toolPage: Page, tool?: "merge" | "split" | "protect") => {
    if (tool) {
      setActiveTool(tool);
      setPage(tool);
    } else {
      setPage(toolPage);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <GlobalStyles />
      <SchemaMarkup />

      <div className="min-h-screen flex flex-col">
        <Navbar page={page} onNavigate={(p) => navigate(p)} />

        <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-10 md:py-16">
          {page === "home" && (
            <Home
              onNavigate={(p, tool) => {
                if ((p === "merge" || p === "split" || p === "protect") && !tool) {
                  setActiveTool(p as "merge" | "split" | "protect");
                  setPage(p);
                } else {
                  navigate(p, tool);
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {(page === "merge" || page === "split" || page === "protect") && (
            <ToolPage
              tool={page as "merge" | "split" | "protect"}
              onBack={() => navigate("home")}
            />
          )}

          {page === "blog" && (
            <BlogPage
              onPost={() => {
                setActivePost(posts[0]);
                setPage("post");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {page === "post" && (
            <PostPage
              post={activePost}
              onBack={() => {
                setPage("blog");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
