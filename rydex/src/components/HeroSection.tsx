"use client";
import React from "react";
import { motion } from "motion/react";
import { Bike, Bus, Car, Truck } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

function HeroSection({ onAuthRequired }: { onAuthRequired: () => void }) {
  const { userData } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 1. Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/heroImage.jpg')" }}
      />

      {/* 2. Overlay  */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-[#0a0a0a]/60" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* 3. Heading*/}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
        >
          Book Any Vehicle
        </motion.div>

        {/* 4. Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 max-w-xl text-gray-300 md:text-lg"
        >
          From daily rides to heavy transport — all in one platform.
        </motion.p>

        {/* 5. Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex gap-4 sm:gap-6 text-gray-300"
        >
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/15 hover:text-white hover:-translate-y-1 transition-all duration-300">
            <Bike size={32} />
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/15 hover:text-white hover:-translate-y-1 transition-all duration-300">
            <Car size={32} />
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/15 hover:text-white hover:-translate-y-1 transition-all duration-300">
            <Bus size={32} />
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/15 hover:text-white hover:-translate-y-1 transition-all duration-300">
            <Truck size={32} />
          </div>
        </motion.div>

        {/* 6. Button  */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-14 px-12 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)] transition-shadow duration-300"
          onClick={() => {
            !userData ? onAuthRequired() : router.push("/user/book");
          }}
        >
          Book Now
        </motion.button>
      </div>
    </div>
  );
}

export default HeroSection;
