"use client";
import React from "react";
import { motion } from "motion/react";

function AnimatedCard({ title, icon, children }: any) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-[32px] p-8 shadow-xl space-y-6 transition-all"
    >
      <div className="flex items-center gap-3 font-bold text-lg text-slate-100">
        {icon}
        {title}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
}

export default AnimatedCard;