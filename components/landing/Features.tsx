"use client";

import React, { useEffect, useState, useRef } from "react";
import { Zap, Shield, Users, Edit, BarChart3, Clock } from "lucide-react";

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      telemetry: "AI_GEN_v2.5",
      title: "AI-Powered Generation",
      description:
        "Describe your form in plain English and watch AI create it instantly with smart field suggestions.",
      icon: Zap,
    },
    {
      telemetry: "AES_256_ENC",
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with encrypted data storage. Your forms and submissions are always safe.",
      icon: Shield,
    },
    {
      telemetry: "SHARE_DISCOVERY",
      title: "Easy Sharing",
      description:
        "Share your forms anywhere with one click. WhatsApp, Email, LinkedIn, and more platforms supported.",
      icon: Users,
    },
    {
      telemetry: "SCHEMA_EDITOR",
      title: "Fully Customizable",
      description:
        "Edit, add, remove, and reorder fields with ease. Make your forms exactly how you want them.",
      icon: Edit,
    },
    {
      telemetry: "ANALYTICS_V2",
      title: "Analytics Dashboard",
      description:
        "Track submissions, analyze responses, and gain insights with our comprehensive analytics tools.",
      icon: BarChart3,
    },
    {
      telemetry: "LATENCY_MIN",
      title: "Save Time",
      description:
        "Create forms in seconds, not hours. Our AI understands your needs and builds forms instantly.",
      icon: Clock,
    },
  ];

  return (
    <div
      id="features"
      ref={sectionRef}
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Ambient decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 opacity-20">
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-syne text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
          Why Choose GenForm?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-sans max-w-2xl mx-auto">
          Everything you need to create amazing forms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((f, index) => {
          const IconComponent = f.icon;
          return (
            <div
              key={index}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
              className={`group relative flex flex-col justify-between overflow-hidden bg-white/60 dark:bg-[#090f19]/40 border border-gray-200 dark:border-gray-800/80 rounded-3xl p-8 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1.5 backdrop-blur-sm transition-all duration-700 ease-out transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              {/* Card micro-grid pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] transition-opacity duration-300 group-hover:opacity-[0.06] rounded-3xl"
                style={{
                  backgroundImage: "radial-gradient(circle, #10b981 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Radial gradient hover glow */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />

              <div>
                {/* Telemetry Header */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-100/50 dark:border-emerald-900/30">
                    [ {f.telemetry} ]
                  </span>
                  <span className="font-mono text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    ACTIVE
                  </span>
                </div>

                {/* Glowing Icon Wrapper */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-350">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <IconComponent className="relative z-10 w-7 h-7 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-syne text-gray-900 dark:text-white mb-3">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                  {f.description}
                </p>
              </div>

              {/* Decorative progress highlight */}
              <div className="w-full h-[2px] bg-gray-100 dark:bg-gray-800/60 rounded-full mt-8 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
