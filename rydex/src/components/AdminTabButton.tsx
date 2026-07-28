"use client";
import React from "react";
import { motion } from "motion/react";

function AdminTabButton({ active, count = 0, onClick, icon, children }: any) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 select-none cursor-pointer group ${
        active
          ? "bg-gradient-to-r from-purple-900/60 via-slate-900 to-slate-950 text-white border border-purple-500/40 shadow-[0_0_20px_-3px_rgba(168,85,247,0.25)]"
          : "bg-slate-900/40 text-slate-400 border border-slate-800/80 hover:bg-slate-900/80 hover:text-slate-200 hover:border-slate-700/80"
      }`}
    >
      {active && (
        <div className="absolute inset-0 rounded-2xl bg-purple-500/5 blur-md pointer-events-none" />
      )}

      <span
        className={`relative z-10 flex items-center transition-colors duration-300 ${
          active
            ? "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            : "text-slate-400 group-hover:text-slate-300"
        }`}
      >
        {icon}
      </span>

      <span className="relative z-10 hidden sm:inline tracking-wide">
        {children}
      </span>

      <span
        className={`relative z-10 min-w-[22px] h-5 px-1.5 text-[11px] font-black rounded-full flex items-center justify-center transition-all shadow-inner ${
          active
            ? "bg-purple-500 text-white shadow-purple-500/50"
            : count > 0
              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
              : "bg-slate-800 text-slate-500 border border-slate-700/50"
        }`}
      >
        {count}
      </span>
    </motion.button>
  );
}

export default AdminTabButton;
