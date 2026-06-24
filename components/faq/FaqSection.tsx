"use client";

import React, { useState } from "react";

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<"forms" | "customize" | "submissions" | "security" | "ai" | null>(null);

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-gray-700 dark:text-gray-300">
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-syne text-gray-900 dark:text-white tracking-tight leading-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {/* FAQ 1 */}
        <div
          className={`group border transition-all duration-300 backdrop-blur-sm cursor-pointer rounded-2xl ${
            openFaq === "forms" 
              ? "bg-white border-emerald-500/30 dark:bg-gray-950 dark:border-emerald-500/40 shadow-lg dark:shadow-none" 
              : "bg-white/60 border-gray-200 dark:bg-[#090f19]/40 dark:border-gray-800/80 hover:border-emerald-500/30 dark:hover:border-emerald-500/20"
          }`}
        >
          <button
            type="button"
            onClick={() =>
              setOpenFaq((prev) => (prev === "forms" ? null : "forms"))
            }
            className="flex w-full items-start sm:items-center gap-4 p-5 sm:p-6 text-left focus-visible:outline-none"
          >
            <span className="font-mono text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold">[ 01 ]</span>
            <span className="flex-1 font-syne font-bold text-sm sm:text-base text-gray-900 dark:text-white transition-colors">
              How many forms can I create?
            </span>
            <span
              className={`ml-3 transform transition-transform duration-500 ease-[cubic-bezier(.16,.84,.44,1)] text-emerald-500 ${
                openFaq === "forms" ? "rotate-180" : ""
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,.84,.44,1)] ${
                openFaq === "forms" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed transition-all duration-500 ease-[cubic-bezier(.16,.84,.44,1)] ${
                    openFaq === "forms" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}
                >
                  With our free plan, you can create up to 3 forms with AI. If you
                  need more, our Pro plan offers unlimited AI-powered form
                  creation. You can create unlimited manual forms on any plan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ 2 */}
        <div
          className={`group border transition-all duration-300 backdrop-blur-sm cursor-pointer rounded-2xl ${
            openFaq === "customize" 
              ? "bg-white border-emerald-500/30 dark:bg-gray-950 dark:border-emerald-500/40 shadow-lg dark:shadow-none" 
              : "bg-white/60 border-gray-200 dark:bg-[#090f19]/40 dark:border-gray-800/80 hover:border-emerald-500/30 dark:hover:border-emerald-500/20"
          }`}
        >
          <button
            type="button"
            onClick={() =>
              setOpenFaq((prev) => (prev === "customize" ? null : "customize"))
            }
            className="flex w-full items-start sm:items-center gap-4 p-5 sm:p-6 text-left focus-visible:outline-none"
          >
            <span className="font-mono text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold">[ 02 ]</span>
            <span className="flex-1 font-syne font-bold text-sm sm:text-base text-gray-900 dark:text-white transition-colors">
              Can I customize the forms?
            </span>
            <span
              className={`ml-3 transform transition-transform duration-500 ease-[cubic-bezier(.16,.84,.44,1)] text-emerald-500 ${
                openFaq === "customize" ? "rotate-180" : ""
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,.84,.44,1)] ${
                openFaq === "customize" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed transition-all duration-500 ease-[cubic-bezier(.16,.84,.44,1)] ${
                    openFaq === "customize" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}
                >
                  Absolutely! After the AI generates your form, you have full
                  control to edit, add, remove, and reorder fields. You can also
                  customize the title and description.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ 3 */}
        <div
          className={`group border transition-all duration-300 backdrop-blur-sm cursor-pointer rounded-2xl ${
            openFaq === "submissions" 
              ? "bg-white border-emerald-500/30 dark:bg-gray-950 dark:border-emerald-500/40 shadow-lg dark:shadow-none" 
              : "bg-white/60 border-gray-200 dark:bg-[#090f19]/40 dark:border-gray-800/80 hover:border-emerald-500/30 dark:hover:border-emerald-500/20"
          }`}
        >
          <button
            type="button"
            onClick={() =>
              setOpenFaq((prev) => (prev === "submissions" ? null : "submissions"))
            }
            className="flex w-full items-start sm:items-center gap-4 p-5 sm:p-6 text-left focus-visible:outline-none"
          >
            <span className="font-mono text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold">[ 03 ]</span>
            <span className="flex-1 font-syne font-bold text-sm sm:text-base text-gray-900 dark:text-white transition-colors">
              How do I see the submissions?
            </span>
            <span
              className={`ml-3 transform transition-transform duration-500 ease-[cubic-bezier(.16,.84,.44,1)] text-emerald-500 ${
                openFaq === "submissions" ? "rotate-180" : ""
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,.84,.44,1)] ${
                openFaq === "submissions" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed transition-all duration-500 ease-[cubic-bezier(.16,.84,.44,1)] ${
                    openFaq === "submissions" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}
                >
                  All submissions for your forms are available in your dashboard.
                  You can view individual submissions and see an overview in the
                  analytics section.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ 4 */}
        <div
          className={`group border transition-all duration-300 backdrop-blur-sm cursor-pointer rounded-2xl ${
            openFaq === "security" 
              ? "bg-white border-emerald-500/30 dark:bg-gray-950 dark:border-emerald-500/40 shadow-lg dark:shadow-none" 
              : "bg-white/60 border-gray-200 dark:bg-[#090f19]/40 dark:border-gray-800/80 hover:border-emerald-500/30 dark:hover:border-emerald-500/20"
          }`}
        >
          <button
            type="button"
            onClick={() =>
              setOpenFaq((prev) => (prev === "security" ? null : "security"))
            }
            className="flex w-full items-start sm:items-center gap-4 p-5 sm:p-6 text-left focus-visible:outline-none"
          >
            <span className="font-mono text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold">[ 04 ]</span>
            <span className="flex-1 font-syne font-bold text-sm sm:text-base text-gray-900 dark:text-white transition-colors">
              Is my form data secure?
            </span>
            <span
              className={`ml-3 transform transition-transform duration-500 ease-[cubic-bezier(.16,.84,.44,1)] text-emerald-500 ${
                openFaq === "security" ? "rotate-180" : ""
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,.84,.44,1)] ${
                openFaq === "security" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed transition-all duration-500 ease-[cubic-bezier(.16,.84,.44,1)] ${
                    openFaq === "security" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}
                >
                  We prioritize security. All submissions are encrypted and stored safely using Prisma and PostgreSQL (via Supabase). Our systems integrate Clerk for secure authentication and use UUIDs to prevent form enumeration attacks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ 5 */}
        <div
          className={`group border transition-all duration-300 backdrop-blur-sm cursor-pointer rounded-2xl ${
            openFaq === "ai" 
              ? "bg-white border-emerald-500/30 dark:bg-gray-950 dark:border-emerald-500/40 shadow-lg dark:shadow-none" 
              : "bg-white/60 border-gray-200 dark:bg-[#090f19]/40 dark:border-gray-800/80 hover:border-emerald-500/30 dark:hover:border-emerald-500/20"
          }`}
        >
          <button
            type="button"
            onClick={() =>
              setOpenFaq((prev) => (prev === "ai" ? null : "ai"))
            }
            className="flex w-full items-start sm:items-center gap-4 p-5 sm:p-6 text-left focus-visible:outline-none"
          >
            <span className="font-mono text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold">[ 05 ]</span>
            <span className="flex-1 font-syne font-bold text-sm sm:text-base text-gray-900 dark:text-white transition-colors">
              How does the AI form generator work?
            </span>
            <span
              className={`ml-3 transform transition-transform duration-500 ease-[cubic-bezier(.16,.84,.44,1)] text-emerald-500 ${
                openFaq === "ai" ? "rotate-180" : ""
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,.84,.44,1)] ${
                openFaq === "ai" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed transition-all duration-500 ease-[cubic-bezier(.16,.84,.44,1)] ${
                    openFaq === "ai" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}
                >
                  GenForm leverages Google&apos;s Gemini API to parse natural language descriptions into structural schema. Once submitted, our AI analyzes the intent to auto-suggest appropriate field types, placeholders, and options in under 5 seconds.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FaqSection;
