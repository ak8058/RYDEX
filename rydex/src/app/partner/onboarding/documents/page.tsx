"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CircleDashed,
  FileCheck,
  UploadCloud,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

type docsType = "aadhar" | "license" | "rc";

export default function RydexDocuments() {
  const router = useRouter();
  const [docs, setDocs] = useState<Record<docsType, File | null>>({
    aadhar: null,
    license: null,
    rc: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDocs = async () => {
    setLoading(true);
    setError("");
    try {
      const formdata = new FormData();
      if (!docs.aadhar || !docs.license || !docs.rc) {
        setError("all documents are required");
        setLoading(false);
        return null;
      }
      formdata.append("aadhar", docs.aadhar);
      formdata.append("license", docs.license);
      formdata.append("rc", docs.rc);

      const { data } = await axios.post(
        "/api/partner/onboarding/documents",
        formdata,
      );
      setLoading(false);
      router.push("/partner/onboarding/bank");
    } catch (error: any) {
      setError(error?.response?.data?.message ?? "something went wrong");
      console.log(error);
      setLoading(false);
    }
  };

  const handleImage = (doc: docsType, file: File | null) => {
    if (!file) {
      return;
    }
    setDocs((prev) => ({ ...prev, [doc]: file }));
  };

  const isCompleted = docs.aadhar && docs.license && docs.rc;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-100/50 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-400/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-6 sm:p-10 z-10"
      >
        {/* Header Section */}
        <div className="relative text-center mb-10">
          <button
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:scale-105 transition-all text-slate-600"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <p className="text-[10px] font-bold uppercase tracking-wider">
              Step 2 of 3
            </p>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Upload Documents
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Required for verification
          </p>
        </div>

        {/* Upload Cards Section */}
        <div className="space-y-4">
          {/* Aadhaar / ID Proof */}
          <motion.label
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 group ${
              docs.aadhar
                ? "bg-indigo-50/50 border-indigo-300 shadow-sm ring-1 ring-indigo-200"
                : "bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30"
            }`}
          >
            <div>
              <p
                className={`text-sm font-bold transition-colors ${docs.aadhar ? "text-indigo-900" : "text-slate-800"}`}
              >
                Aadhaar / ID Proof
              </p>
              <p
                className={`text-xs mt-0.5 font-medium transition-colors ${docs.aadhar ? "text-indigo-700/70" : "text-slate-500"}`}
              >
                Government issued ID
              </p>
            </div>

            {docs.aadhar ? (
              <span className="text-xs text-indigo-600 font-bold bg-indigo-100 px-3 py-1.5 rounded-full">
                Uploaded
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500">
                  Upload
                </span>
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center shadow-sm group-hover:border-indigo-200 group-hover:text-indigo-500 transition-all">
                  <UploadCloud size={18} />
                </div>
              </div>
            )}

            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) =>
                handleImage("aadhar", e.target?.files?.[0] || null)
              }
            />
          </motion.label>

          {/* Driving License */}
          <motion.label
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 group ${
              docs.license
                ? "bg-indigo-50/50 border-indigo-300 shadow-sm ring-1 ring-indigo-200"
                : "bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30"
            }`}
          >
            <div>
              <p
                className={`text-sm font-bold transition-colors ${docs.license ? "text-indigo-900" : "text-slate-800"}`}
              >
                Driving License
              </p>
              <p
                className={`text-xs mt-0.5 font-medium transition-colors ${docs.license ? "text-indigo-700/70" : "text-slate-500"}`}
              >
                Valid driving license
              </p>
            </div>
            {docs.license ? (
              <span className="text-xs text-indigo-600 font-bold bg-indigo-100 px-3 py-1.5 rounded-full">
                Uploaded
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500">
                  Upload
                </span>
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center shadow-sm group-hover:border-indigo-200 group-hover:text-indigo-500 transition-all">
                  <UploadCloud size={18} />
                </div>
              </div>
            )}
            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) =>
                handleImage("license", e.target?.files?.[0] || null)
              }
            />
          </motion.label>

          {/* Vehicle RC */}
          <motion.label
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 group ${
              docs.rc
                ? "bg-indigo-50/50 border-indigo-300 shadow-sm ring-1 ring-indigo-200"
                : "bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30"
            }`}
          >
            <div>
              <p
                className={`text-sm font-bold transition-colors ${docs.rc ? "text-indigo-900" : "text-slate-800"}`}
              >
                Vehicle RC
              </p>
              <p
                className={`text-xs mt-0.5 font-medium transition-colors ${docs.rc ? "text-indigo-700/70" : "text-slate-500"}`}
              >
                Registration Certificate
              </p>
            </div>
            {docs.rc ? (
              <span className="text-xs text-indigo-600 font-bold bg-indigo-100 px-3 py-1.5 rounded-full">
                Uploaded
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500">
                  Upload
                </span>
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center shadow-sm group-hover:border-indigo-200 group-hover:text-indigo-500 transition-all">
                  <UploadCloud size={18} />
                </div>
              </div>
            )}
            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) => handleImage("rc", e.target?.files?.[0] || null)}
            />
          </motion.label>
        </div>

        {/* Info text */}
        <div className="mt-6 flex items-center gap-3 text-xs text-slate-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
          <FileCheck size={18} className="text-indigo-600 shrink-0" />
          <p className="font-medium">
            Documents are securely stored and manually verified by our team.
          </p>
        </div>

        {error && (
          <p className="text-red-500 mt-4 text-xs font-semibold">*{error}</p>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={isCompleted ? { scale: 1.02, y: -2 } : {}}
          whileTap={isCompleted ? { scale: 0.98 } : {}}
          onClick={handleDocs}
          disabled={!isCompleted || loading}
          className={`mt-8 w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
            ${
              isCompleted
                ? "bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-700 hover:shadow-indigo-600/40"
                : "bg-slate-100 text-slate-400 shadow-transparent cursor-not-allowed border border-slate-200"
            }`}
        >
          {loading ? (
            <CircleDashed className="text-white animate-spin" />
          ) : (
            "Continue"
          )}
          {isCompleted && !loading && (
            <ArrowRight size={18} className="animate-pulse" />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
