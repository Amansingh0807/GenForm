"use client";

import React from "react";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Michael Ross",
      role: "Product Manager",
      initials: "MR",
      quote:
        "GenForm has revolutionized how we create forms. The AI generation is incredibly accurate and saves us hours of work!",
      rating: 5,
    },
    {
      name: "Tarry Hanie",
      role: "Marketing Director",
      initials: "TH",
      quote:
        "The sharing features are amazing! I can share my forms on WhatsApp, LinkedIn, and more with just one click.",
      rating: 5,
    },
    {
      name: "Soudip Das",
      role: "Business Owner",
      initials: "SD",
      quote:
        "Best form builder I've used. Clean interface, powerful features, and excellent analytics dashboard.",
      rating: 5,
    },
  ];

  return (
    <div id="testimonials" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-gray-700 dark:text-gray-300">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 opacity-30">
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[90px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[90px]" />
      </div>

      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-syne text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
          Loved by Teams Worldwide
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-sans max-w-2xl mx-auto">
          See how GenForm is transforming the way builders gather data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="group relative flex flex-col justify-between overflow-hidden bg-white/60 dark:bg-[#090f19]/40 border border-gray-200 dark:border-gray-800/80 rounded-3xl p-8 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm"
          >
            {/* Subtle grid background pattern inside card */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] transition-opacity duration-300 group-hover:opacity-[0.06] rounded-3xl"
              style={{
                backgroundImage: "radial-gradient(circle, #10b981 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div>
              {/* Stars & Telemetry Badge */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-emerald-500 text-emerald-500 transition-transform duration-300 group-hover:scale-110"
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/30">
                  VERIFIED
                </span>
              </div>

              {/* Quote Block */}
              <div className="relative mb-8">
                {/* Decorative stylized giant quote mark */}
                <span className="absolute -top-4 -left-2 text-6xl text-emerald-500/10 dark:text-emerald-500/5 font-syne select-none">
                  &ldquo;
                </span>
                <p className="relative z-10 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-sans font-medium italic">
                  &quot;{t.quote}&quot;
                </p>
              </div>
            </div>

            {/* Profile footer */}
            <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-800/80 pt-6">
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-syne font-bold text-sm shadow-md shadow-emerald-500/10">
                  {t.initials}
                </div>
                {/* Active/online blinker dot */}
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-gray-900 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-bold font-syne text-gray-900 dark:text-white truncate">
                  {t.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
