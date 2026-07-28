"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Bike,
  Car,
  Package,
  Truck,
  ArrowRight,
  CircleDashed,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const VEHICLES = [
  { id: "bike", label: "Bike", icon: Bike, desc: "2 wheeler" },
  { id: "auto", label: "Auto", icon: Car, desc: "3 wheeler" },
  { id: "car", label: "Car", icon: Car, desc: "4 wheeler" },
  { id: "loading", label: "Loading", icon: Package, desc: "Small goods" },
  { id: "truck", label: "Truck", icon: Truck, desc: "Heavy cargo" },
];

export default function RydexVehicleDetails() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = vehicleType && vehicleNumber.length > 4 && vehicleModel;

  const handleVehicle = async () => {
    setError("");
    try {
      setLoading(true);
      const { data } = await axios.post("/api/partner/onboarding/vehicle", {
        type: vehicleType,
        number: vehicleNumber,
        vehicleModel,
      });
      setLoading(false);
      router.push("/partner/onboarding/documents");
    } catch (error: any) {
      setError(error?.response?.data?.message ?? "something went wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleGetVehicle = async () => {
      try {
        const { data } = await axios.get("/api/partner/onboarding/vehicle");
        setVehicleType(data.type);
        setVehicleNumber(data.number);
        setVehicleModel(data.vehicleModel);
      } catch (error: any) {
        console.log(error);
      }
    };
    handleGetVehicle();
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
              Step 1 of 3
            </p>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Vehicle Details
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Register your vehicle to start driving with Rydex.
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-8">
          <div>
            <p className="text-xs font-bold text-slate-700 mb-4 uppercase tracking-wide ml-1">
              Select Vehicle Type
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {VEHICLES.map((v) => {
                const Icon = v.icon;
                const active = vehicleType === v.id;

                return (
                  <motion.div
                    key={v.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setVehicleType(v.id)}
                    className={`rounded-2xl border p-4 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 group
                      ${
                        active
                          ? "bg-indigo-50/50 border-indigo-300 shadow-sm ring-1 ring-indigo-200"
                          : "bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30"
                      }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                        ${
                          active
                            ? "bg-indigo-600 text-white shadow-indigo-600/20"
                            : "bg-white border border-slate-200 text-slate-400 group-hover:border-indigo-200 group-hover:text-indigo-500"
                        }`}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-sm font-bold transition-colors ${active ? "text-indigo-900" : "text-slate-700"}`}
                      >
                        {v.label}
                      </div>
                      <p
                        className={`text-[11px] mt-0.5 font-medium transition-colors ${
                          active ? "text-indigo-700/70" : "text-slate-500"
                        }`}
                      >
                        {v.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Inputs Section */}
          <div className="space-y-5">
            <div>
              <label
                htmlFor="vn"
                className="text-xs font-bold text-slate-700 mb-1.5 block uppercase tracking-wide ml-1"
              >
                Vehicle Number
              </label>
              <input
                type="text"
                onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                value={vehicleNumber}
                placeholder="e.g. MH12AB1234"
                id="vn"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="vm"
                className="text-xs font-bold text-slate-700 mb-1.5 block uppercase tracking-wide ml-1"
              >
                Vehicle Model
              </label>
              <input
                type="text"
                onChange={(e) => setVehicleModel(e.target.value)}
                value={vehicleModel}
                placeholder="e.g. Tata Ace, Swift Dzire"
                id="vm"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">*{error}</p>}
        {/* Submit Button */}
        <motion.button
          whileHover={isFormValid ? { scale: 1.02, y: -2 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
          disabled={!isFormValid || loading}
          onClick={handleVehicle}
          className={`mt-10 w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
            ${
              isFormValid
                ? "bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-700 hover:shadow-indigo-600/40"
                : "bg-slate-100 text-slate-400 shadow-transparent cursor-not-allowed border border-slate-200"
            }`}
        >
          {loading ? (
            <CircleDashed className="text-white animate-spin" />
          ) : (
            "Continue"
          )}
          {isFormValid && <ArrowRight size={18} className="animate-pulse" />}
        </motion.button>
      </motion.div>
    </div>
  );
}
