"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Bike,
  Car,
  ChevronRight,
  LogOut,
  Menu,
  Truck,
  X,
} from "lucide-react";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { signOut } from "next-auth/react";
import { setUserData } from "@/redux/userSlice";

const Nav = () => {
  const pathName = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    dispatch(setUserData(null));
    setProfileOpen(false);
  };

  const confirmLogout = () => {
    handleLogOut();
    setLogoutConfirmOpen(false);
    setProfileOpen(false);
  };

  // --- REUSABLE PROFILE MENU CONTENT ---
  const profileMenuContent = userData && (
    <>
      <div className="p-5 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
        <p className="font-semibold text-lg truncate">{userData.name}</p>
        <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">
          {userData.role}
        </p>
      </div>

      <div className="p-2">
        {userData.role !== "partner" && (
          <>
            <Link
              href="/"
              onClick={() => setProfileOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-3 hover:bg-white/10 rounded-xl transition-colors cursor-pointer text-sm font-medium"
            >
              Bookings
              <ChevronRight size={16} className="ml-auto text-gray-400" />
            </Link>

            <Link
              href="/partner/onboarding/vehicle"
              onClick={() => setProfileOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-3 hover:bg-white/10 rounded-xl transition-colors cursor-pointer text-sm font-medium group"
            >
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-white/10 border border-[#121212] flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Bike size={12} />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 border border-[#121212] flex items-center justify-center group-hover:bg-white/20 transition-colors z-10">
                  <Car size={12} />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 border border-[#121212] flex items-center justify-center group-hover:bg-white/20 transition-colors z-20">
                  <Truck size={12} />
                </div>
              </div>
              Become a Partner
              <ChevronRight size={16} className="ml-auto text-gray-400" />
            </Link>
          </>
        )}

        {/* Logout Button */}
        <button
          className="w-full flex items-center gap-3 px-3 py-3 mt-1 hover:bg-red-500/10 text-red-500 rounded-xl transition-colors cursor-pointer text-sm font-medium"
          onClick={() => {
            setProfileOpen(false);
            setLogoutConfirmOpen(true);
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2
  w-[94%] md:w-[86%] z-50 rounded-full 
  bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 text-white
  shadow-[0_8px_30px_rgb(0,0,0,0.4)] py-3 px-4`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* 1. Logo */}
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity block py-1"
          >
            <Image
              src={"/logo.png"}
              alt="Rydex Logo"
              width={44}
              height={44}
              priority
              className="object-contain"
            />
          </Link>

          {/* 2. Navigation Links (Desktop Only) */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              href={"/"}
            >
              Home
            </Link>
            <Link
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              href={"/"}
            >
              Bookings
            </Link>
          </div>

          {/* 3. Auth / Profile / Hamburger */}
          <div className="flex items-center gap-3 relative">
            {!userData ? (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-6 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors shadow-md"
              >
                Login
              </button>
            ) : (
              <div className="relative">
                {/* Profile Avatar Button */}
                <button
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 text-white font-bold flex items-center justify-center shadow-lg border border-white/20 hover:scale-105 transition-transform relative z-50"
                  onClick={() => setProfileOpen((p) => !p)}
                >
                  {userData.name.charAt(0).toUpperCase()}
                </button>

                {/* --- DESKTOP PROFILE DROPDOWN --- */}
                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div
                        className="hidden md:block fixed inset-0 z-40"
                        onClick={() => setProfileOpen(false)}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="hidden md:block absolute top-14 right-0 w-[300px] z-50 bg-[#121212] text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                      >
                        {profileMenuContent}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Hamburger Menu Icon */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={20} className="text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* --- MOBILE NAV LINK (HAMBURGER) DROPDOWN --- */}
      <AnimatePresence>
        {mobileNavOpen && (
          <div className="md:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex flex-col pt-[88px] px-4">
            {/* Background click to close overlay */}
            <div
              className="absolute inset-0 z-0"
              // onClick={() => setMobileNavOpen(false)}
            />

            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 w-full bg-[#121212] text-white rounded-2xl shadow-2xl border border-white/10 p-3 flex flex-col"
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
                <span className="font-semibold text-gray-300">Menu</span>
                <button onClick={() => setMobileNavOpen(false)}>
                  <X size={20} className="text-gray-400 hover:text-white" />
                </button>
              </div>
              <Link
                href="/"
                onClick={() => setMobileNavOpen(false)}
                className="px-4 py-3 text-sm font-medium hover:bg-white/10 rounded-xl transition-colors"
              >
                Home
              </Link>
              <Link
                href="/"
                onClick={() => setMobileNavOpen(false)}
                className="px-4 py-3 text-sm font-medium hover:bg-white/10 rounded-xl transition-colors"
              >
                Bookings
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MOBILE PROFILE BOTTOM SHEET --- */}
      <AnimatePresence>
        {profileOpen && userData && (
          <div className="md:hidden fixed inset-0 z-[80] flex items-end justify-center bg-black/60 backdrop-blur-sm p-0">
            {/* Dark Background Overlay (Bahar click karne pe close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0"
              onClick={() => setProfileOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 w-full bg-[#121212] text-white rounded-t-3xl shadow-[0_-10px_40px_rgb(0,0,0,0.5)] border border-white/10 overflow-hidden pb-6"
            >
              {/* Swipe Down Handle */}
              <div
                className="w-full flex justify-center pt-4 pb-2 cursor-pointer"
                onClick={() => setProfileOpen(false)}
              >
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              {profileMenuContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {logoutConfirmOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#181818] border border-white/10 w-full max-w-sm rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center relative z-10"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Logout</h3>
              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to log out of your Rydex account?
              </p>

              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => setLogoutConfirmOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
                >
                  No, Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
                >
                  Yes, Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Nav;
