"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

function AdminContentList({ data, type }: any) {
  const router = useRouter();
  if (data?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-slate-900/40 backdrop-blur-xl rounded-2xl py-16 text-center border-2 border-dashed border-slate-800/80 shadow-2xl"
      >
        <div className="absolute inset-0 bg-emerald-500/5 blur-3xl pointer-events-none rounded-2xl" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            delay: 0.1,
            stiffness: 300,
            damping: 20,
          }}
          className="relative z-10 w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]"
        >
          <CheckCircle2
            size={26}
            className="text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          />
        </motion.div>

        <p className="relative z-10 font-bold text-slate-200 text-lg tracking-wide">
          All caught up!
        </p>
        <p className="relative z-10 text-sm text-slate-500 mt-1.5 font-medium">
          No pending items right now.
        </p>
      </motion.div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1 mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          {type === "partner"
            ? "Partner Reviews Queue"
            : type === "kyc"
              ? "Pending Video KYC Queue"
              : "vehicle Reviews Queue"}
        </p>
        <p className="text-xs text-gray-400">{data.length} items</p>
      </div>
      {data.map((item: any, index: number) => {
        const name = item.name || item.owner.name;
        const email = item.email || item.owner.email;
        return (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700/80 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 bg-slate-800 border border-slate-700 text-purple-400 shadow-inner">
                {name.charAt(0).toUpperCase() ?? <User size={14} />}
              </div>

              <div className="min-w-0">
                <p className="font-bold text-sm text-slate-100 truncate">
                  {name}
                </p>
                <p className="text-xs text-slate-400 truncate">{email}</p>
              </div>
            </div>
            <div className="shrink-0">
              {item.videoKycStatus === "pending" ? (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-purple-500/50 text-purple-300 text-sm font-semibold transition-all shadow-inner"
                >
                  Start Video KYC <ArrowRight size={15} />
                </motion.button>
              ) : item.videoKycStatus === "in_progress" ? (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-purple-500/50 text-purple-300 text-sm font-semibold transition-all shadow-inner"
                >
                  Join Call <ArrowRight size={15} />
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-purple-500/50 text-purple-300 text-sm font-semibold transition-all shadow-inner"
                  onClick={() => {
                    type == "partner"
                      ? router.push(`/admin/reviews/partner/${item._id}`)
                      : router.push(`/admin/reviews/vehicle/${item._id}`);
                  }}
                >
                  Review <ArrowRight size={15} />
                </motion.button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default AdminContentList;
