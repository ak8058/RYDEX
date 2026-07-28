"use client";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { Check, Clock, Lock, Sparkles } from "lucide-react";
import PartnerRejectionCard from "./PartnerRejectionCard";
import PartnerStatusCard from "./PartnerStatusCard";

type Step = {
  id: number;
  title: string;
  route?: string;
  description?: string;
};

/* ================= STEPS ================= */

const STEPS: Step[] = [
  { id: 1, title: "Vehicle Details", route: "/partner/onboarding/vehicle" },
  { id: 2, title: "Documents", route: "/partner/onboarding/documents" },
  { id: 3, title: "Bank Setup", route: "/partner/onboarding/bank" },
  { id: 4, title: "Review" },
  { id: 5, title: "Video KYC" },
  { id: 6, title: "Pricing" },
  { id: 7, title: "Final Review" },
  { id: 8, title: "Go Live" },
];

const TOTAL_STEPS = STEPS.length;

export default function PartnerDashboard() {
  const [activeStep, setActiveStep] = useState(0);
  const { userData } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      setActiveStep(userData.partnerOnBoardingSteps + 1);
    }
  }, [userData]);

  const progressPercentage = ((activeStep - 1) / (TOTAL_STEPS - 1)) * 100;

  const goToStep = (step: Step) => {
    if (step.route && step.id <= activeStep) {
      router.push(step.route);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 pt-28 pb-20 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3">
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Partner Portal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Partner Onboarding
            </h1>
            <p className="text-slate-400 mt-1.5 font-medium text-sm sm:text-base">
              Complete all steps sequentially to activate your account and start
              earning.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              {Math.min(activeStep, TOTAL_STEPS)}/{TOTAL_STEPS}
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Overall Progress
              </p>
              <p className="text-xs font-bold text-slate-200">
                {Math.round(progressPercentage)}% Completed
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border border-slate-800/80 overflow-x-auto">
          <div className="min-w-[850px] py-4">
            <div className="relative">
              <div className="absolute top-[26px] left-7 right-7 h-[4px] bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full"
                />
              </div>

              {/* Steps Nodes */}

              <div className="relative z-10 flex justify-between">
                {STEPS.map((s) => {
                  const completed = s.id < activeStep;
                  const active = s.id === activeStep;
                  const locked = s.id > activeStep;

                  return (
                    <motion.div
                      key={s.id}
                      whileHover={!locked ? { scale: 1.05, y: -2 } : {}}
                      onClick={() => goToStep(s)}
                      className={`flex flex-col items-center ${
                        s.route && s.id <= activeStep
                          ? "cursor-pointer group"
                          : "cursor-default"
                      }`}
                    >
                      {/* Circle Node */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all shadow-md ${
                          completed
                            ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-emerald-500/20"
                            : active
                              ? "bg-slate-900 text-indigo-400 border-indigo-500 ring-4 ring-indigo-500/20 shadow-indigo-500/20"
                              : "bg-slate-900/50 text-slate-600 border-slate-800"
                        }`}
                      >
                        {completed ? (
                          <Check size={20} strokeWidth={3} />
                        ) : locked ? (
                          <Lock size={18} className="text-slate-600" />
                        ) : (
                          <span className="font-extrabold text-base">
                            {s.id}
                          </span>
                        )}
                      </div>

                      {/* Step Title & Subtitle */}
                      <div className="mt-4 text-center max-w-[100px]">
                        <p
                          className={`text-xs font-bold transition-colors ${
                            active
                              ? "text-indigo-400"
                              : completed
                                ? "text-slate-200"
                                : "text-slate-600"
                          }`}
                        >
                          {s.title}
                        </p>
                        {active && (
                          <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                            Current
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {activeStep == 4 && userData?.partnerStatus === "rejected" && (
          <PartnerRejectionCard
            title="Partner Rejected"
            reason={userData.vehicleRejectionReason}
            actionLabel={`Review and Update`}
            onAction={() => {
              router.push("/partner/onboarding/vehicle");
            }}
          />
        )}
        {activeStep == 4 && userData?.partnerStatus === "pending" && (
          <PartnerStatusCard
            icon={<Clock size={18} />}
            title={"Documents under review"}
            desc={"Admin is verifying your documents."}
          />
        )}
      </div>
    </div>
  );
}
