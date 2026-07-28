"use client";
import { AlertTriangle } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

export default function PartnerRejectionCard({ title, reason, actionLabel, onAction }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        bg-red-500/5 
        backdrop-blur-xl 
        border border-red-500/20 
        rounded-[2rem] 
        p-6 sm:p-8 
        space-y-5 
        shadow-2xl
      "
    >
      <div className="flex items-center gap-2.5 text-red-400 font-bold text-lg tracking-tight">
        <AlertTriangle size={22} className="text-red-500" />
        {title}
      </div>

      <div className="bg-slate-950/50 border border-red-500/10 rounded-xl p-4 sm:p-5 text-slate-300 text-sm sm:text-base font-medium shadow-inner">
        {reason}
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className="
            w-full sm:w-auto
            px-6 
            py-2.5 
            bg-red-500/10 
            text-red-400 
            border border-red-500/20 
            rounded-xl 
            text-sm sm:text-base
            font-bold
            tracking-wide
            hover:bg-red-500 hover:text-white hover:border-red-500
            transition-all duration-200
          "
        >
          {actionLabel || "Retry"}
        </button>
      )}
    </motion.div>
  );
}