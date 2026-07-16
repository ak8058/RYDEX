"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bike, Car, ChevronRight, LogOut, Menu, Truck, X } from "lucide-react";
import AuthModal from "./AuthModal";
const Nav = () => {
  const pathName = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-3 left-1/2 -translate-x-1/2
        w-[94%] md:w-[86%]
        z-50 rounded-full bg-[#0B0B0B] text-white
        shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* 1. Logo */}
          <Image src={"/logo.png"} alt="logo" width={44} height={44} priority />
          {/* 2. Icon */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              className="relative text-sm font-medium text-gray-300 hover:text-white transition"
              href={"/"}
            >
              Home
            </Link>
            <Link
              className="relative text-sm font-medium text-gray-300 hover:text-white transition"
              href={"/partner/bookings"}
            >
              Bookings
            </Link>
          </div>
          {/* 3. Login */}
          <div className="flex items-center gap-3 relative">
            <div className="hidden md:block relative">
              <button
                onClick={() => setAuthOpen(true)}
                className="px-4 py-1.5 rounded-full bg-white text-black text-sm"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Nav;
