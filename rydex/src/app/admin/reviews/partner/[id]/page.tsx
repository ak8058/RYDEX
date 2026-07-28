"use client";

import AnimatedCard from "@/components/AnimatedCard";
import DocPreview from "@/components/DocPreview";
import { IPartnerBank } from "@/models/partnerBank.model";
import { IPartnerDocs } from "@/models/partnerDocs.model";
import { IVehicle } from "@/models/partnerVehicle.model";
import { IUser } from "@/models/user.model";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import {
  ArrowLeft,
  Car,
  CheckCircle,
  CircleDashed,
  Clock,
  FileText,
  Landmark,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const { id } = useParams();
  const [data, setData] = useState<IUser | null>(null);
  const [partnerVehicle, setPartnerVehicle] = useState<IVehicle | null>(null);
  const [partnerDocs, setPartnerDocs] = useState<IPartnerDocs | null>(null);
  const [partnerBank, setPartnerBank] = useState<IPartnerBank | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [vehicleRejectionReason, setVehicleRejectionReason] = useState("");
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const router = useRouter();

  const handleGetPartner = async () => {
    try {
      const { data } = await axios.get(`/api/admin/reviews/partner/${id}`);
      setData(data.partner);
      setPartnerVehicle(data.vehicle);
      setPartnerDocs(data.documents);
      setPartnerBank(data.bank);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPartner();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-400">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full" />
        </motion.div>
        <span className="text-sm font-medium animate-pulse">
          Fetching Partner Details...
        </span>
      </div>
    );
  }

  const handleApprove = async () => {
    setApproveLoading(true);
    try {
      const { data } = await axios.get(
        `/api/admin/reviews/partner/${id}/approve`,
      );
      setApproveLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      setApproveLoading(false);
    }
  };

  const handleReject = async () => {
    setRejectLoading(true);
    try {
      const { data } = await axios.post(
        `/api/admin/reviews/partner/${id}/reject`,
        {
          vehicleRejectionReason,
        },
      );

      console.log(data);
      setRejectLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      setRejectLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white pb-20">
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white text-slate-300 transition-colors"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <div className="font-bold text-lg text-slate-100">{data?.name}</div>
            <div className="text-xs text-slate-400">{data?.email}</div>
          </div>
          {data?.partnerStatus === "approved" ? (
            <div className="px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-inner">
              <CheckCircle size={14} />
              Approved
            </div>
          ) : data?.partnerStatus === "rejected" ? (
            <div className="px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 shadow-inner">
              <XCircle size={14} />
              Rejected
            </div>
          ) : (
            <div className="px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-inner">
              <Clock size={14} />
              Pending
            </div>
          )}
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AnimatedCard
            title="Vehicle Details"
            icon={<Car size={18} className="text-purple-400" />}
          >
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Vehicle Type</span>
              <span className="font-semibold text-slate-200">
                {partnerVehicle?.type || "-"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Registration Number</span>
              <span className="font-semibold text-slate-200">
                {partnerVehicle?.number || "-"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Model</span>
              <span className="font-semibold text-slate-200">
                {partnerVehicle?.vehicleModel || "-"}
              </span>
            </div>
          </AnimatedCard>

          <AnimatedCard
            title="Documents"
            icon={<FileText size={18} className="text-purple-400" />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <DocPreview label={"Aadhaar"} url={partnerDocs?.aadharUrl} />
              <DocPreview
                label={"Driving License"}
                url={partnerDocs?.licenseUrl}
              />
              <DocPreview
                label={"Registration Certificate"}
                url={partnerDocs?.rcUrl}
              />
            </div>
          </AnimatedCard>
        </div>

        <div className="space-y-8">
          <AnimatedCard
            title={"Bank Details"}
            icon={<Landmark size={18} className="text-purple-400" />}
          >
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Account Holder</span>
              <span className="font-semibold text-slate-200">
                {partnerBank?.accountHolder || "-"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Account Number</span>
              <span className="font-semibold text-slate-200">
                {partnerBank?.accountNumber || "-"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">IFSC Code</span>
              <span className="font-semibold text-slate-200">
                {partnerBank?.ifsc || "-"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">UPI ID</span>
              <span className="font-semibold text-slate-200">
                {partnerBank?.upi || "-"}
              </span>
            </div>
          </AnimatedCard>

          {data?.partnerStatus == "pending" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-[32px] p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-2 font-bold text-slate-100">
                <ShieldCheck size={18} className="text-purple-400" />
                Admin Check
              </div>
              <p className="text-sm text-slate-400">
                Verify documents carefully before approving.
              </p>

              <div className="flex flex-col gap-4 mt-4">
                <button
                  className="py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/20 transition-colors shadow-inner"
                  onClick={() => setShowApprove(true)}
                >
                  Approve Partner
                </button>

                <button
                  className="py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/20 transition-colors shadow-inner"
                  onClick={() => setShowReject(true)}
                >
                  Reject Partner
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {showApprove && (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 shadow-2xl rounded-[32px] p-8 w-full max-w-sm"
            >
              <h2 className="text-xl font-bold text-slate-100">
                Approve Partner?
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Confirm all information has been verified and is correct.
              </p>
              <div className="flex gap-3 mt-8">
                <button
                  className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-medium transition-colors"
                  onClick={() => setShowApprove(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 flex items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-colors"
                  onClick={handleApprove}
                  disabled={approveLoading}
                >
                  {approveLoading ? (
                    <CircleDashed className="text-white animate-spin" />
                  ) : (
                    "Yes, Approve"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReject && (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 shadow-2xl rounded-[32px] p-8 w-full max-w-sm"
            >
              <h2 className="text-xl font-bold text-slate-100">
                Reject Partner?
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Provide a reason for rejecting this partner.
              </p>
              <textarea
                placeholder="Enter rejection reason (required)"
                value={vehicleRejectionReason}
                onChange={(e) => setVehicleRejectionReason(e.target.value)}
                className="w-full mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none h-28"
              />
              <div className="flex gap-3 mt-8">
                <button
                  className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-medium transition-colors"
                  onClick={() => setShowReject(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 flex items-center justify-center rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg shadow-red-500/20 transition-colors"
                  onClick={handleReject}
                  disabled={rejectLoading}
                >
                  {rejectLoading ? (
                    <CircleDashed className="text-white animate-spin" />
                  ) : (
                    "Reject"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default page;
