"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Car,
  CircleDashed,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

type propType = {
  open: boolean;
  onClose: () => void;
};
type stepType = "login" | "signup" | "otp";

function AuthModal({ open, onClose }: propType) {
  const [step, setStep] = useState<stepType>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);

  const session = useSession();
  console.log(session);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setErr("");
      setStep("login");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErr(error.response.data.message ?? "something went wrong");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    console.log(res);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  const handleChangeOtp = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md flex justify-center items-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[420px] rounded-[2.5rem] bg-[#121212] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden text-white"
            >
              {/* Close Button */}
              <button
                className="absolute right-6 top-6 z-10 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                onClick={onClose}
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              <div className="p-8 sm:p-10">
                {/* Animated Header */}
                <div className="relative mb-8 text-center py-6 overflow-hidden flex flex-col items-center justify-center">
                  {/* Car & Light Trail Animation (Background) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    {/* Light Trail */}
                    <motion.div
                      className="absolute h-[1px] w-[100px] bg-gradient-to-r from-transparent via-white to-transparent"
                      initial={{ x: "-250%" }}
                      animate={{ x: "250%" }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Moving Car Icon */}
                    <motion.div
                      className="absolute text-white/20"
                      initial={{ x: -150 }}
                      animate={{ x: 150 }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    >
                      <Car size={40} strokeWidth={1} />
                    </motion.div>
                  </div>

                  {/* Main Text (Foreground) */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.h1
                      initial={{ opacity: 0.8 }}
                      animate={{
                        opacity: 1,
                        textShadow: "0px 0px 15px rgba(245, 196, 60, 0.4)",
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "26px",
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        color: "#fff",
                      }}
                      className="uppercase"
                    >
                      RY<span style={{ color: "#F5C43C" }}>D</span>EX
                    </motion.h1>

                    <p
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.12em",
                        marginTop: "3px",
                      }}
                      className="uppercase font-medium"
                    >
                      PREMIUM VEHICLE BOOKING
                    </p>
                  </div>
                </div>

                {/* Dynamic Content area */}
                <div className="min-h-[250px]">
                  <AnimatePresence mode="wait">
                    {/* 1. LOGIN */}
                    {step === "login" && (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
                          Welcome back
                        </h2>
                        <div className="space-y-4">
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Mail
                                size={18}
                                className="text-gray-500 group-focus-within:text-white transition-colors"
                              />
                            </div>
                            <input
                              type="email"
                              placeholder="Email address"
                              className="w-full bg-[#1C1C1C] border-2 border-transparent focus:bg-[#252525] focus:border-white/30 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-500"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>

                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock
                                size={18}
                                className="text-gray-500 group-focus-within:text-white transition-colors"
                              />
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="w-full bg-[#1C1C1C] border-2 border-transparent focus:bg-[#252525] focus:border-white/30 rounded-2xl py-3.5 pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-gray-500"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                            >
                              {showPassword ? (
                                <Eye size={18} />
                              ) : (
                                <EyeOff size={18} />
                              )}
                            </button>
                          </div>

                          <button
                            className="w-full py-4 mt-2 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:bg-gray-200 active:scale-[0.98] transition-all flex justify-center items-center shadow-lg shadow-white/5"
                            onClick={handleLogin}
                            disabled={loading}
                          >
                            {!loading ? (
                              "Sign In"
                            ) : (
                              <CircleDashed
                                size={20}
                                className="animate-spin text-black"
                              />
                            )}
                          </button>
                        </div>

                        <p className="mt-8 text-center text-sm font-medium text-gray-400">
                          New to Rydex?{" "}
                          <button
                            onClick={() => setStep("signup")}
                            className="text-white font-bold hover:underline"
                          >
                            Create an account
                          </button>
                        </p>
                      </motion.div>
                    )}

                    {/* 2. SIGN UP */}
                    {step === "signup" && (
                      <motion.div
                        key="signup"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
                          Create Account
                        </h2>
                        <div className="space-y-4">
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <User
                                size={18}
                                className="text-gray-500 group-focus-within:text-white transition-colors"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Full Name"
                              className="w-full bg-[#1C1C1C] border-2 border-transparent focus:bg-[#252525] focus:border-white/30 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-500"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                          </div>

                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Mail
                                size={18}
                                className="text-gray-500 group-focus-within:text-white transition-colors"
                              />
                            </div>
                            <input
                              type="email"
                              placeholder="Email address"
                              className="w-full bg-[#1C1C1C] border-2 border-transparent focus:bg-[#252525] focus:border-white/30 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-500"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>

                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock
                                size={18}
                                className="text-gray-500 group-focus-within:text-white transition-colors"
                              />
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="w-full bg-[#1C1C1C] border-2 border-transparent focus:bg-[#252525] focus:border-white/30 rounded-2xl py-3.5 pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-gray-500"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                            >
                              {showPassword ? (
                                <Eye size={18} />
                              ) : (
                                <EyeOff size={18} />
                              )}
                            </button>
                          </div>

                          {err && (
                            <p className="text-red-400 text-xs font-medium pl-2">
                              *{err}
                            </p>
                          )}

                          <button
                            className="w-full py-4 mt-2 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:bg-gray-200 active:scale-[0.98] transition-all flex justify-center items-center shadow-lg shadow-white/5"
                            disabled={loading}
                            onClick={handleSignUp}
                          >
                            {!loading ? (
                              "Continue"
                            ) : (
                              <CircleDashed
                                size={20}
                                className="animate-spin text-black"
                              />
                            )}
                          </button>
                        </div>

                        <p className="mt-8 text-center text-sm font-medium text-gray-400">
                          Already a member?{" "}
                          <button
                            onClick={() => setStep("login")}
                            className="text-white font-bold hover:underline"
                          >
                            Sign In
                          </button>
                        </p>
                      </motion.div>
                    )}

                    {/* 3. OTP VERIFICATION */}
                    {step === "otp" && (
                      <motion.div
                        key="otp"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full justify-center"
                      >
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                          Verify Email
                        </h2>
                        <p className="text-sm text-gray-400 mt-2 mb-8">
                          We've sent a code to {"anil19062004"}
                          <span className="text-white font-semibold">
                            {email}
                          </span>
                        </p>

                        <div className="flex justify-between gap-3">
                          {otp.map((digit, i) => (
                            <input
                              key={i}
                              id={`otp-${i}`}
                              value={digit}
                              maxLength={1}
                              className="w-full aspect-square text-center text-xl font-bold rounded-2xl bg-[#1C1C1C] border-2 border-transparent focus:bg-[#252525] focus:border-white/30 text-white outline-none transition-all"
                              onChange={(e) =>
                                handleChangeOtp(i, e.target.value)
                              }
                              onKeyDown={(e) => handleKeyDown(i, e)}
                            />
                          ))}
                        </div>

                        <button className="w-full py-4 mt-8 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:bg-gray-200 active:scale-[0.98] transition-all flex justify-center items-center shadow-lg shadow-white/5">
                          {!loading ? (
                            "Verify & Create Account"
                          ) : (
                            <CircleDashed
                              size={20}
                              className="animate-spin text-black"
                            />
                          )}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Global Footer (Google Login) - Only show on Login/Signup */}
                {step !== "otp" && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <button
                      className="w-full py-3.5 rounded-full border-2 border-white/10 bg-transparent flex items-center justify-center gap-3 text-sm font-bold text-gray-300 hover:bg-white/5 hover:text-white transition-all active:scale-[0.98]"
                      onClick={handleGoogleLogin}
                    >
                      <Image
                        src="/google.png"
                        alt="Google"
                        width={20}
                        height={20}
                        className="w-5 h-5 opacity-90"
                      />
                      Continue with Google
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;
