"use client";
import { isCloudinaryPdf, pdfPageUrl } from "@/lib/docUrl";
import React from "react";

type DocPreviewProps = {
  label: string;
  /** Cloudinary URL of the uploaded document, if any. */
  url?: string | null;
  /** Route of the full-document viewer, opened in a new tab. */
  href: string;
};

function DocPreview({ label, url, href }: DocPreviewProps) {
  const isImage = /\.(jpg|jpeg|png|webp)$/i.test(url || "");
  const isPdf = isCloudinaryPdf(url);

  // Cloudinary blocks delivery of the PDF itself, so the thumbnail is page 1
  // rendered as a JPEG derivative.
  const thumb = isPdf && url ? pdfPageUrl(url, 1, 600) : url || undefined;

  return (
    <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden shadow-sm transition-all hover:border-slate-600/50">
      <div className="px-4 py-3 border-b border-slate-700/50 text-sm font-semibold text-slate-300 tracking-wide">
        {label}
      </div>

      <div className="h-52 flex items-center justify-center bg-slate-900/50 relative">
        {!url && (
          <span className="text-xs font-medium text-slate-500 bg-slate-800/50 px-4 py-2 rounded-lg">
            Not Uploaded
          </span>
        )}

        {(isImage || isPdf) && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity"
              alt={label}
            />
          </a>
        )}

        {isPdf && (
          <span className="absolute top-2 right-2 text-[10px] font-semibold uppercase tracking-wide bg-slate-900/80 text-slate-300 px-2 py-1 rounded-md pointer-events-none">
            PDF
          </span>
        )}
      </div>

      {url && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xs py-3 font-semibold text-purple-400 hover:text-purple-300 hover:bg-slate-800/60 transition-colors border-t border-slate-700/50"
        >
          Open Full Document
        </a>
      )}
    </div>
  );
}

export default DocPreview;
