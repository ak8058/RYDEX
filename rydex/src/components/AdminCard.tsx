"use client";

import React from "react";
import { motion } from "motion/react";

const CARD_CONFIG: Record<
  string,
  {
    gradient: string;
    glow: string;
    border: string;
    iconBg: string;
    iconColor: string;
    textGradient: string;
  }
> = {
  totalPartners: {
    gradient: "from-purple-950/40 via-slate-900/80 to-slate-950",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]",
    border: "border-purple-500/20 group-hover:border-purple-500/50",
    iconBg: "bg-purple-500/10 border border-purple-500/20",
    iconColor: "text-purple-400",
    textGradient: "from-white via-purple-100 to-purple-300",
  },
  approved: {
    gradient: "from-cyan-950/40 via-slate-900/80 to-slate-950",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]",
    border: "border-cyan-500/20 group-hover:border-cyan-500/50",
    iconBg: "bg-cyan-500/10 border border-cyan-500/20",
    iconColor: "text-cyan-400",
    textGradient: "from-white via-cyan-100 to-cyan-300",
  },
  pending: {
    gradient: "from-amber-950/40 via-slate-900/80 to-slate-950",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
    border: "border-amber-500/20 group-hover:border-amber-500/50",
    iconBg: "bg-amber-500/10 border border-amber-500/20",
    iconColor: "text-amber-400",
    textGradient: "from-white via-amber-100 to-amber-300",
  },
  rejected: {
    gradient: "from-rose-950/40 via-slate-900/80 to-slate-950",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)]",
    border: "border-rose-500/20 group-hover:border-rose-500/50",
    iconBg: "bg-rose-500/10 border border-rose-500/20",
    iconColor: "text-rose-400",
    textGradient: "from-white via-rose-100 to-rose-300",
  },
};

function AdminCard({ label, value, icon, variant }: any) {
  const card = CARD_CONFIG[variant] || CARD_CONFIG.totalPartners;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${card.gradient} 
        border ${card.border} backdrop-blur-xl shadow-2xl cursor-default group transition-all duration-500 ${card.glow}`}
    >
      <div
        className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 group-hover:opacity-30 
        blur-2xl transition-opacity duration-700 pointer-events-none bg-current"
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.15 }}
            transition={{ duration: 0.5 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${card.iconBg} ${card.iconColor}`}
          >
            {icon}
          </motion.div>

          <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-current transition-colors duration-300" />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1 group-hover:text-slate-300 transition-colors">
            {label}
          </p>

          <motion.div
            className={`text-3xl font-black bg-gradient-to-r ${card.textGradient} bg-clip-text text-transparent tracking-tight`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {value}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminCard;
