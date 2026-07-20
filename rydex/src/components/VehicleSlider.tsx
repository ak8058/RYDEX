import {
  Bike,
  Bus,
  Car,
  CarTaxiFront,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Truck,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const VEHICLE_CATEGORIES = [
  {
    title: "All Vehicles",
    desc: "Browse the full fleet",
    Icon: CarTaxiFront,
    tag: "Popular",
  },
  { title: "Bikes", desc: "Fast & affordable rides", Icon: Bike, tag: "Quick" },
  { title: "Cars", desc: "Comfortable city travel", Icon: Car, tag: "Comfort" },
  { title: "SUVs", desc: "Premium & spacious", Icon: Car, tag: "Premium" },
  { title: "Vans", desc: "Family & group transport", Icon: Bus, tag: "Family" },
  {
    title: "Trucks",
    desc: "Heavy & commercial transport",
    Icon: Truck,
    tag: "Cargo",
  },
];

function VehicleSlider() {
  const [hovered, setHovered] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-[#050505] min-h-screen py-16 sm:py-24 px-4 sm:px-8 overflow-hidden relative selection:bg-white selection:text-black">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-zinc-900/30 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-row items-end justify-between mb-12 sm:mb-16 gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-zinc-700" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
                Premium Fleet
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-[1.1]">
              Vehicle <br />
              <span className="relative inline-block text-zinc-400">
                Categories
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-white origin-left rounded-full"
                />
              </span>
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base mt-6 font-medium max-w-sm">
              Select the perfect ride for your exact needs. From quick city
              trips to heavy cargo transport.
            </p>
          </div>

          {/* Controls - Now visible on mobile too, but scaled appropriately */}
          <div className="flex items-center gap-2 sm:gap-3 pb-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("left")}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-colors text-zinc-400"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("right")}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-colors text-zinc-400"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </motion.button>
          </div>
        </motion.div>

        <div className="relative -mx-4 sm:mx-0 px-4 sm:px-0">
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 pt-10 pb-12 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {VEHICLE_CATEGORIES.map((c, i) => {
              const isHovered = hovered === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  whileHover={{ y: -8 }}
                  className="group relative w-[75vw] sm:w-[300px] flex-shrink-0 cursor-pointer snap-start"
                >
                  <motion.div
                    animate={{
                      backgroundColor: isHovered ? "#18181b" : "#09090b", // zinc-900 vs zinc-950
                      borderColor: isHovered ? "#3f3f46" : "#27272a", // zinc-700 vs zinc-800
                      boxShadow: isHovered
                        ? "0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.03)"
                        : "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-3xl border p-6 sm:p-8 h-full flex flex-col justify-between min-h-[260px]"
                  >
                    <div>
                      <motion.div
                        animate={{
                          backgroundColor: isHovered
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(255,255,255,0.03)",
                          color: isHovered ? "#ffffff" : "#a1a1aa",
                          borderColor: isHovered
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(255,255,255,0.05)",
                        }}
                        className="inline-flex items-center gap-1.5 border border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-8 transition-colors"
                      >
                        <Sparkles
                          size={10}
                          className={isHovered ? "text-yellow-400" : ""}
                        />
                        {c.tag}
                      </motion.div>

                      <motion.h3
                        animate={{ color: isHovered ? "#ffffff" : "#e4e4e7" }}
                        transition={{ duration: 0.2 }}
                        className="text-2xl font-black tracking-tight leading-none mb-3"
                      >
                        {c.title}
                      </motion.h3>

                      <motion.p
                        animate={{
                          color: isHovered ? "#a1a1aa" : "#71717a",
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-medium leading-relaxed"
                      >
                        {c.desc}
                      </motion.p>
                    </div>

                    <motion.div
                      animate={{
                        backgroundColor: isHovered ? "#ffffff" : "#18181b",
                        borderColor: isHovered ? "#ffffff" : "#27272a",
                      }}
                      className="w-14 h-14 rounded-2xl border flex items-center justify-center mt-8 transition-colors self-end"
                    >
                      <motion.div
                        animate={{ color: isHovered ? "#000000" : "#71717a" }}
                        transition={{ duration: 0.2 }}
                      >
                        <c.Icon size={24} strokeWidth={1.5} />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-0">
          {[
            { num: "6+", label: "Categories" },
            { num: "10+", label: "Vehicle Types" },
            { num: "24 / 7", label: "Availability" },
          ].map((d, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.6 + i * 0.15,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="flex items-baseline gap-3"
              >
                <p className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 text-2xl sm:text-3xl font-black tracking-tighter">
                  {d.num}
                </p>
                <p className="text-zinc-500 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                  {d.label}
                </p>
              </motion.div>

              {/* Vertical Divider - Sirf desktop par dikhega */}
              {i !== 2 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                  className="hidden sm:block w-px h-8 bg-zinc-800  mx-8 md:mx-12 origin-top"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VehicleSlider;
