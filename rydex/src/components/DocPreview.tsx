"use client";
import React from "react";

function DocPreview({ label, url }: any) {
  const isImage = url?.match(/\.(jpg|jpeg|png|webp)$/i);
  const isPdf = url?.endsWith(".pdf");

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

        {isImage && (
          <img
            src={url}
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
            alt={label}
          />
        )}

        {isPdf && (
          <iframe
            src={url}
            className="w-full h-full opacity-90"
            title={label}
          />
        )}
      </div>

      {url && (
        <a
          href={url}
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
