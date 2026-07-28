"use client";

import { DOC_TYPES, DocType, isCloudinaryPdf, pdfPageUrl } from "@/lib/docUrl";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_PAGES = 30;

function Spinner({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-32 text-slate-400 text-sm">
      <Loader2 size={16} className="animate-spin" />
      {text}
    </div>
  );
}

function DocumentViewerPage() {
  const { id, type } = useParams<{ id: string; type: string }>();
  const doc = DOC_TYPES[type as DocType];

  const [url, setUrl] = useState<string | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(!!doc);
  const [error, setError] = useState<string | null>(
    doc ? null : "Unknown document type",
  );

  useEffect(() => {
    if (!doc) return;
    const load = async () => {
      try {
        const { data } = await axios.get(`/api/admin/reviews/partner/${id}`);
        const docUrl = data.documents?.[doc.field] || null;
        if (!docUrl) {
          setError("This document has not been uploaded");
        }
        setUrl(docUrl);
      } catch {
        setError("Could not load this document");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, doc]);

  useEffect(() => {
    document.title = doc ? `${doc.label} — RYDEX` : "Document — RYDEX";
  }, [doc]);

  // The page count isn't stored on the document, so walk forward until a page
  // 404s. Probing at w_200 keeps the discovery pass cheap.
  useEffect(() => {
    if (!url || !isCloudinaryPdf(url)) return;
    let cancelled = false;

    const discover = async () => {
      const found: number[] = [];
      for (let p = 1; p <= MAX_PAGES; p++) {
        const exists = await new Promise<boolean>((resolve) => {
          const probe = new window.Image();
          probe.onload = () => resolve(true);
          probe.onerror = () => resolve(false);
          probe.src = pdfPageUrl(url, p, 200);
        });
        if (cancelled) return;
        if (!exists) break;
        found.push(p);
        setPages([...found]);
      }
    };

    discover();
    return () => {
      cancelled = true;
    };
  }, [url]);

  const isPdf = isCloudinaryPdf(url);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
          <div className="font-semibold text-sm tracking-wide">
            {doc?.label || "Document"}
          </div>
          {isPdf && pages.length > 0 && (
            <span className="text-xs text-slate-400">
              {pages.length} page{pages.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading && <Spinner text="Loading document" />}

        {!loading && error && (
          <div className="py-32 text-center text-sm text-slate-400">{error}</div>
        )}

        {!loading && !error && url && !isPdf && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={doc?.label}
            className="w-full rounded-xl shadow-2xl bg-white"
          />
        )}

        {!loading && !error && url && isPdf && (
          <div className="space-y-8">
            {pages.length === 0 && <Spinner text="Rendering pages" />}
            {pages.map((p) => (
              <div key={p} className="space-y-2">
                <div className="text-xs text-slate-500 font-medium">
                  Page {p}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pdfPageUrl(url, p, 1600)}
                  alt={`${doc?.label} page ${p}`}
                  className="w-full rounded-xl shadow-2xl bg-white"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default DocumentViewerPage;
