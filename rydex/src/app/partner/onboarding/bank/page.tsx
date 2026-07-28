"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle,
  CreditCard,
  Landmark,
  Phone,
  ShieldCheck,
  ArrowRight,
  CircleDashed,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

export default function RydexBankSetup() {
  const router = useRouter();
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [upi, setUpi] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpi, setShowUpi] = useState(false);

  const isMobileFormatValid = INDIAN_MOBILE_REGEX.test(mobileNumber.trim());
  const isNotRepeatedDigits = !/^(\d)\1{9}$/.test(mobileNumber.trim());

  const sanitizedIfsc = ifsc.trim().toUpperCase();
  const isNameValid = accountHolder.trim().length >= 3;
  const isAccountValid = accountNumber.trim().length >= 9;
  const isIfscValid = IFSC_REGEX.test(sanitizedIfsc);
  const isMobileValid = isMobileFormatValid && isNotRepeatedDigits;

  const canSubmit =
    isNameValid && isAccountValid && isIfscValid && isMobileValid;

  const handleBank = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/partner/onboarding/bank", {
        accountHolder,
        accountNumber,
        ifsc: sanitizedIfsc,
        upi,
        mobileNumber,
      });
      setLoading(false);
      window.location.href = "/";
    } catch (error: any) {
      setError(error?.response?.data?.message || "something went wrong");
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGetBank = async () => {
      try {
        const { data } = await axios.get("/api/partner/onboarding/bank");
        setAccountHolder(data.partnerBank.accountHolder);
        setAccountNumber(data.partnerBank.accountNumber);
        setIfsc(data.partnerBank.ifsc);
        setMobileNumber(data.mobileNumber);
        setUpi(data.partnerBank.upi);
      } catch (error: any) {
        console.log(error);
      }
    };
    handleGetBank();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-100/50 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-400/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-6 sm:p-10 z-10"
      >
        {/* Header */}
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
              Step 3 of 3
            </p>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bank & Payout Setup
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Where should we send your earnings?
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Account Holder Name */}
          <div>
            <label
              htmlFor="accName"
              className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1"
            >
              Account Holder Name
            </label>
            <div className="relative mt-1.5 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <BadgeCheck size={18} />
              </div>
              <input
                type="text"
                id="accName"
                placeholder="As per bank records"
                className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm focus:outline-none focus:ring-4 transition-all
                  ${
                    !isNameValid && accountHolder.length > 0
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 focus:bg-white"
                  }`}
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
              />
            </div>
            {!isNameValid && accountHolder.length > 0 && (
              <p className="mt-2 text-xs text-red-500">
                Minimum 3 characters required
              </p>
            )}
          </div>

          {/* Account Number */}
          <div>
            <label
              htmlFor="accNum"
              className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1"
            >
              Bank Account Number
            </label>
            <div className="relative mt-1.5 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <CreditCard size={18} />
              </div>
              <input
                type="password"
                id="accNum"
                placeholder="Enter account number"
                className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm focus:outline-none focus:ring-4 transition-all
                  ${
                    !isAccountValid && accountNumber.length > 0
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 focus:bg-white"
                  }`}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            {!isAccountValid && accountNumber.length > 0 && (
              <p className="mt-2 text-xs text-red-500">
                Account number must be at least 9 digits
              </p>
            )}
          </div>

          {/* IFSC Code */}
          <div>
            <label
              htmlFor="ifscCode"
              className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1"
            >
              IFSC Code
            </label>
            <div className="relative mt-1.5 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Landmark size={18} />
              </div>
              <input
                type="text"
                id="ifscCode"
                placeholder="e.g. HDFC0001234"
                className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm focus:outline-none focus:ring-4 transition-all
                  ${
                    !isIfscValid && ifsc.length > 0
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 focus:bg-white"
                  }`}
                value={ifsc.toUpperCase()}
                onChange={(e) => setIfsc(e.target.value)}
              />
            </div>
            {!isIfscValid && ifsc.length > 0 && (
              <p className="mt-2 text-xs text-red-500">Invalid IFSC code</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            {/* Mobile Number Field */}
            <div className="flex flex-col">
              <label
                htmlFor="mobNum"
                className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1 mb-1.5"
              >
                Mobile Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  id="mobNum"
                  maxLength={10}
                  placeholder="10 digit number"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm focus:outline-none focus:ring-4 transition-all
          ${
            !isMobileValid && mobileNumber.length > 0
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 focus:bg-white"
          }`}
                  value={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>

              <div className="min-h-[20px] mt-1">
                {!isMobileValid && mobileNumber.length > 0 && (
                  <p className="text-xs text-red-500">
                    Enter a valid 10-digit mobile number
                  </p>
                )}
              </div>
            </div>

            {/* UPI ID Field (Optional) */}
            <div className="flex flex-col">
              {!showUpi ? (
                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-wide ml-1 mb-1.5 opacity-0 select-none">
                    UPI ID
                  </label>
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowUpi(true)}
                      className="w-full h-[50px] inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50/60 hover:bg-indigo-50 px-4 rounded-2xl transition-all border border-indigo-100 border-dashed"
                    >
                      + Add UPI ID (Optional)
                    </button>
                  </div>
                </div>
              ) : (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col"
                  >
                    <div className="flex justify-between items-center mb-1.5 ml-1">
                      <label
                        htmlFor="upiId"
                        className="text-xs font-bold text-slate-700 uppercase tracking-wide"
                      >
                        UPI ID
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowUpi(false);
                          setUpi("");
                        }}
                        className="text-[11px] font-medium text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <span className="font-bold text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 group-focus-within:bg-indigo-100 group-focus-within:text-indigo-600 transition-colors">
                          UPI
                        </span>
                      </div>
                      <input
                        type="text"
                        id="upiId"
                        placeholder="name@bank"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all"
                        value={upi}
                        onChange={(e) => setUpi(e.target.value)}
                      />
                    </div>
                    <div className="min-h-[20px] mt-1" />{" "}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

        {/* Security Banner */}
        <div className="mt-8 flex items-start gap-3 bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
          <ShieldCheck size={20} className="text-emerald-600 mt-0.5 shrink-0" />
          <p className="text-xs text-emerald-800 leading-relaxed font-medium">
            Your bank details are encrypted and securely stored. Verification
            for the first payout usually takes 24–48 hours.
          </p>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={canSubmit ? { scale: 1.02, y: -2 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          onClick={handleBank}
          disabled={!canSubmit || loading}
          className={`mt-8 w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
            ${
              canSubmit
                ? "bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-700 hover:shadow-indigo-600/40"
                : "bg-slate-100 text-slate-400 shadow-transparent cursor-not-allowed border border-slate-200"
            }`}
        >
          {loading ? (
            <CircleDashed className="text-white animate-spin" />
          ) : (
            "Complete Registration"
          )}
          {canSubmit && <ArrowRight size={18} className="animate-pulse" />}
        </motion.button>
      </motion.div>
    </div>
  );
}
