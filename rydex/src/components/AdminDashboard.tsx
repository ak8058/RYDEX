"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Clock,
  LogOut,
  Truck,
  User,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import AdminTabButton from "./AdminTabButton";
import { AnimatePresence } from "motion/react";
import AdminContentList from "./AdminContentList";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";

type Stats = {
  totalPartners: number;
  totalApprovedPartners: number;
  totalPendingPartners: number;
  totalRejectedPartners: number;
};

type Tab = "partner" | "kyc" | "vehicle";

function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("partner");

  const [partnerReviews, setPartnerReviews] = useState<any>();
  const [pendingkyc, setPendingkyc] = useState<any>();
  const [vehicleReviews, setVehicleReviews] = useState<any>();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);

  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleGetData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      console.log(data);
      setStats(data.stats);
      setPartnerReviews(data.pendingPartnersReviews);
      setVehicleReviews(data.pendingVehicles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleLogOut = async () => {
    try {
      await signOut({ redirect: false });
      setIsDropDownOpen(false);
      setIsConfirmingLogout(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white">
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 z-40">
        <div className="relative max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={44}
              height={44}
              priority
              className="drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]"
            />
          </div>
          <button
            onClick={() => {
              setIsDropDownOpen(!isDropDownOpen);
              setIsConfirmingLogout(false);
            }}
            className="flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-purple-300 shadow-inner"
          >
            <User size={14} className="text-purple-400" />
            Admin Dashboard
          </button>
        </div>
        <AnimatePresence>
          {isDropDownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-4 top-full mt-2 w-60 rounded-xl p-2 bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 shadow-2xl z-50 origin-top-right overflow-hidden"
            >
              {isConfirmingLogout ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-1"
                >
                  <p className="text-sm font-medium text-slate-200 text-center mb-3">
                    Are you sure you want to log out?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsConfirmingLogout(false)}
                      className="flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                      No, Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleLogOut();
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      Yes, Logout
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Normal Dropdown View */
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {/* User Info Section */}
                  <div className="px-3 pb-3 pt-1 border-b border-slate-800/80 mb-1">
                    <p className="text-sm font-semibold text-slate-200">
                      {userData?.name || "Admin"}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {userData?.email || "admin@company.com"}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsConfirmingLogout(true)}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 mt-1 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminCard
            label="Total Partners"
            value={stats?.totalPartners ?? 0}
            icon={<Users className="w-5 h-5" />}
            variant={"totalPartners"}
          />
          <AdminCard
            label="Approved Partners"
            value={stats?.totalApprovedPartners ?? 0}
            icon={<CheckCircle2 className="w-5 h-5" />}
            variant={"approved"}
          />
          <AdminCard
            label="Pending Partners"
            value={stats?.totalPendingPartners ?? 0}
            icon={<Clock className="w-5 h-5" />}
            variant={"pending"}
          />
          <AdminCard
            label="Rejected Partners"
            value={stats?.totalRejectedPartners ?? 0}
            icon={<XCircle className="w-5 h-5" />}
            variant={"rejected"}
          />
        </div>
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-slate-800/80 flex flex-wrap gap-2">
          <AdminTabButton
            active={activeTab == "partner"}
            count={partnerReviews?.length ?? 0}
            icon={<Users size={16} />}
            onClick={() => setActiveTab("partner")}
          >
            Pending Partner Reviews
          </AdminTabButton>

          <AdminTabButton
            active={activeTab == "kyc"}
            count={pendingkyc?.length ?? 0}
            icon={<Video size={16} />}
            onClick={() => setActiveTab("kyc")}
          >
            Pending Video KYC
          </AdminTabButton>

          <AdminTabButton
            active={activeTab == "vehicle"}
            count={vehicleReviews?.length ?? 0}
            icon={<Truck size={16} />}
            onClick={() => setActiveTab("vehicle")}
          >
            Pending Vehicle Reviews
          </AdminTabButton>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-3"
          >
            {activeTab == "partner" && (
              <AdminContentList data={partnerReviews ?? []} type={"partner"} />
            )}
            {activeTab == "kyc" && (
              <AdminContentList data={pendingkyc ?? []} type={"kyc"} />
            )}

            {activeTab == "vehicle" && (
              <AdminContentList data={vehicleReviews ?? []} type={"vehicle"} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default AdminDashboard;
