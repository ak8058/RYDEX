"use client";
import React from "react";
import { motion } from "motion/react";

export default function PartnerStatusCard({ icon, title, desc }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        bg-slate-900/80 
        backdrop-blur-xl 
        rounded-[2rem] 
        p-6 sm:p-8 
        shadow-2xl 
        border border-slate-800/80 
        flex 
        flex-col sm:flex-row 
        gap-5
        items-start sm:items-center
      "
    >
      <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
        {icon}
      </div>
      <div className="flex-1">
        <h2 className="text-lg md:text-xl font-bold text-slate-100 tracking-tight">
          {title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-1 font-medium">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}