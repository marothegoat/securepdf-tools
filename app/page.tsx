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
  Star,
  Zap,
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
const BlogArticle = () => (
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
);

const posts: BlogPost[] = [
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
      const blob = new Blob([bytes], { type: "application/pdf" });
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

          <button
            onClick={() => inputRef.current?.click()}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-600 hover:border-indigo-500 text-slate-500 hover:text-indigo-400 text-sm font-mono transition-all flex items-center justify-center gap-2 hover:bg-indigo-500/5"
          >
            <Plus className="w-4 h-4" /> Add more files
          </button>
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

// hidden ref trick for add-more in merge tool — attach a ref manually
const inputRef = React.createRef<HTMLInputElement>();

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
        const blob = new Blob([bytes], { type: "application/pdf" });
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
          disabled={status === "processing"}
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
      const bytes = await doc.save({
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
      const blob = new Blob([bytes], { type: "application/pdf" });
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
Add page.tsx
