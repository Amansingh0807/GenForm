"use client";

import React, { useEffect, useState, useRef } from "react";
import { StatCounter } from "../ui/StatCounter";

export default function Stats() {
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

  const stats = [
    {
      telemetry: "TOTAL_FORMS",
      label: "Forms Created",
      valueComponent: <StatCounter endValue={1} suffix="k+" />,
    },
    {
      telemetry: "ACTIVE_USERS",
      label: "Happy Users",
      valueComponent: <StatCounter endValue={500} suffix="+" />,
    },
    {
      telemetry: "SLA_UPTIME",
      label: "Uptime Guaranteed",
      valueComponent: <StatCounter endValue={99.9} suffix="%" decimals={1} />,
    },
    {
      telemetry: "SUPPORT_LEVEL",
      label: "Customer Support",
      valueComponent: (
        <span className="text-emerald-500 dark:text-emerald-400">Max</span>
      ),
    },
  ];

  return (
    <div
      ref={sectionRef}
      className={`relative group overflow-hidden bg-white/60 dark:bg-[#090f19]/40 border border-gray-200 dark:border-gray-800/80 rounded-3xl p-6 sm:p-10 md:p-12 mb-12 sm:mb-16 md:mb-20 shadow-xl dark:shadow-2xl backdrop-blur-md transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Decorative inner gradient lights */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30 overflow-hidden select-none -z-10">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse duration-[6s]" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse duration-[8s] delay-1000" />
      </div>

      {/* Grid overlay lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 select-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.15) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y-2 md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800/40">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between pt-6 md:pt-0 px-2 group/tile transition-all duration-500 delay-[${
              index * 100
            }ms]`}
          >
            {/* Telemetry Indicator */}
            <div className="font-mono text-[9px] text-emerald-600/80 dark:text-emerald-400/80 tracking-wider mb-3">
              [ {stat.telemetry} ]
            </div>

            {/* Display Big Numeric Figure */}
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-syne text-gray-900 dark:text-white mb-2 tracking-tight group-hover/tile:scale-105 transition-transform duration-300">
              {isVisible ? (
                stat.valueComponent
              ) : (
                <span className="text-gray-300 dark:text-gray-700">--</span>
              )}
            </div>

            {/* Metric Label Description */}
            <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 font-sans tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
