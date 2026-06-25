"use client";

import React from "react";
import { FileText, Sparkles, Share2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Describe",
      systemStatus: "READY",
      icon: FileText,
      description:
        "Simply type what your form is about. For example, \"A job application form for a software engineer\".",
    },
    {
      number: "02",
      title: "Generate",
      systemStatus: "PROCESSING",
      icon: Sparkles,
      description:
        "Our AI analyzes your request and instantly generates a complete, ready-to-use form with relevant fields.",
    },
    {
      number: "03",
      title: "Share",
      systemStatus: "ONLINE",
      icon: Share2,
      description:
        "Publish your form and share it with a unique link. Start collecting submissions right away.",
    },
  ];

  return (
    <div id="features" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      {/* Aesthetic ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-syne text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
          How It Works
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-sans max-w-2xl mx-auto">
          Create your perfect form in 3 simple, automated steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connection lines on desktop */}
        <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800/80 -z-10" />

        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden bg-white/60 dark:bg-[#090f19]/40 border border-gray-200 dark:border-gray-800/80 rounded-3xl p-8 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Radial gradient hover glow */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />

              <div>
                {/* Telemetry Header */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    [ STEP {step.number} ]
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-50 dark:bg-gray-900/50 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-800/40">
                    SYS: {step.systemStatus}
                  </span>
                </div>

                {/* Glowing Icon Wrapper */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <IconComponent className="relative z-10 w-7 h-7 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-syne text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              {/* Decorative step completion status bar */}
              <div className="w-full h-[2px] bg-gray-100 dark:bg-gray-800/80 rounded-full mt-8 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-smooth-out group-hover:w-full"
                  style={{ width: "24%" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
