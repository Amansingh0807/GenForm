"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface HeroSectionProps {
  userId?: string | null;
}

const prompts = [
  {
    input: 'genform create "Event RSVP Form for Tech Conference"',
    output: [
      "Connecting to Gemini-2.5-Pro Parser... [OK]",
      "Generating RSVP fields constraints... [OK]",
      "✔ Created: input text 'Full Name' (required)",
      "✔ Created: input email 'Work Email' (required)",
      "✔ Created: select 'T-Shirt Size' (XS, S, M, L, XL)",
      "✔ Created: text-area 'Dietary Requirements' (optional)",
      "Optimizing responsive UI styling... [OK]",
      "Deploying endpoint: https://genforma.vercel.app/f/tech-rsvp-8b92",
      "STATUS: Form generated successfully in 1.25s!",
    ],
  },
  {
    input: 'genform create "Software Developer Job Application"',
    output: [
      "Connecting to Gemini-2.5-Pro Parser... [OK]",
      "Detecting applicant fields structure... [OK]",
      "✔ Created: input text 'Candidate Name' (required)",
      "✔ Created: input email 'Contact Email' (required)",
      "✔ Created: input url 'GitHub Portfolio Link' (required)",
      "✔ Created: select 'Experience level' (Junior, Mid, Senior)",
      "✔ Created: file 'Upload Resume PDF' (required)",
      "Deploying endpoint: https://genforma.vercel.app/f/dev-apply-5d12",
      "STATUS: Form generated successfully in 1.42s!",
    ],
  },
  {
    input: 'genform create "Customer Product Feedback Survey"',
    output: [
      "Connecting to Gemini-2.5-Pro Parser... [OK]",
      "Parsing customer satisfaction parameters... [OK]",
      "✔ Created: rating-scale 'Overall Product Quality' (1-5 stars)",
      "✔ Created: check-box 'Favorite Features' (Speed, UX, Price)",
      "✔ Created: text-area 'Any additional comments?' (optional)",
      "Finalizing database schema... [OK]",
      "Deploying endpoint: https://genforma.vercel.app/f/feedback-881c",
      "STATUS: Form generated successfully in 0.98s!",
    ],
  },
];

export default function HeroSection({ userId }: HeroSectionProps) {
  // Terminal Simulator State
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let isTypingInput = true;
    const currentPromptObj = prompts[currentPromptIdx];
    setTerminalLines([]);

    const runSimulator = () => {
      if (!currentPromptObj) return;

      if (isTypingInput) {
        // Typing prompt command character-by-character
        if (charIdx <= (currentPromptObj.input?.length ?? 0)) {
          setTerminalLines([
            `$ ${currentPromptObj.input.substring(0, charIdx)}_`,
          ]);
          charIdx++;
          animationTimerRef.current = setTimeout(runSimulator, 60);
        } else {
          // Finished typing input command, clean trailing cursor
          setTerminalLines([`$ ${currentPromptObj.input}`]);
          isTypingInput = false;
          charIdx = 0;
          animationTimerRef.current = setTimeout(runSimulator, 500); // short wait before output
        }
      } else {
        // Printing output lines one-by-one
        const outputLines = currentPromptObj.output || [];
        if (lineIdx < outputLines.length) {
          const nextLine = outputLines[lineIdx];
          if (typeof nextLine === "string") {
            setTerminalLines((prev) => [...prev, nextLine]);
          }
          lineIdx++;
          // Stagger outputs for realistic console compile feel
          const delay = lineIdx <= 2 ? 300 : 150;
          animationTimerRef.current = setTimeout(runSimulator, delay);
        } else {
          // Done typing this prompt, wait 4 seconds and loop next prompt
          animationTimerRef.current = setTimeout(() => {
            setCurrentPromptIdx((prev) => (prev + 1) % prompts.length);
          }, 4500);
        }
      }
    };

    animationTimerRef.current = setTimeout(runSimulator, 500);

    return () => {
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    };
  }, [currentPromptIdx]);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
      {/* Background Decorative Pulsing Lights */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none select-none opacity-30">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl animate-pulse duration-5000"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-3xl animate-pulse duration-8000 delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-500/5 dark:bg-green-500/5 blur-3xl animate-pulse duration-[10s] delay-1000"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side Content Column */}
        <div className="lg:col-span-7 flex flex-col text-left">
          {/* Neon System Tag */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/30 mb-6 font-mono text-xs tracking-wider">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>[ SYSTEM: READY_TO_DEPLOY ]</span>
          </div>

          {/* Main Hero Header */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-syne text-gray-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
            Create Forms in{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Seconds
            </span>
          </h1>

          {/* Description Subtext */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed font-sans">
            Transform your ideas and natural language queries into beautiful,
            fully functional form interfaces instantly. Powered by Gemini AI.
            No coding required.
          </p>

          {/* CTA Action Deck */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <Link
              href={userId ? "/dashboard/analytics" : "/sign-up"}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold px-8 py-6 text-base shadow-lg shadow-emerald-500/25 border-none rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {userId ? "Go to Dashboard" : "Start Creating Free"}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/demo" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-syne px-8 py-6 text-base border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded-xl transition-all duration-300"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                See a Demo form
              </Button>
            </Link>
          </div>

          {/* Live System Diagnostics Console */}
          <div className="flex items-center gap-3 font-mono text-[11px] text-gray-500 dark:text-gray-400 bg-slate-100/70 dark:bg-[#070c14] border border-slate-200/80 dark:border-gray-800/80 rounded-xl px-4 py-2.5 max-w-xl shadow-inner select-none hover:border-emerald-500/30 transition-all duration-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
              LIVE_DIAGNOSTICS:
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 divide-x divide-slate-200 dark:divide-slate-800">
              <span className="text-gray-600 dark:text-gray-300">PING: 24ms</span>
              <span className="pl-4 text-gray-600 dark:text-gray-300">SLA: 99.9%</span>
              <span className="pl-4 text-emerald-600 dark:text-emerald-400 font-semibold">SSL: SECURE</span>
            </div>
          </div>
        </div>

        {/* Right Side Simulator Column */}
        <div className="lg:col-span-5 relative w-full">
          {/* Subtle surrounding glow blob */}
          <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-2xl -z-10" />

          {/* Terminal Box Frame */}
          <div className="relative w-full bg-slate-950/90 dark:bg-black/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-2xl p-6 overflow-hidden min-h-[340px] flex flex-col justify-between font-mono text-xs text-slate-300 backdrop-blur-md">
            {/* Dots background overlay inside console */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02] select-none"
              style={{
                backgroundImage: "radial-gradient(circle, #10b981 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div>
              {/* macOS style header bar window triggers */}
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-4 mb-4 select-none">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  zsh -- gemini-ai-compiler
                </span>
                <span className="w-4" />
              </div>

               {/* Console Output Log */}
              <div className="space-y-2">
                {terminalLines.map((line, idx) => {
                  if (typeof line !== "string") return null;

                  const isPrompt = line.startsWith("$ ");
                  const isError = line.startsWith("✗");
                  const isSuccess = line.startsWith("STATUS:") || line.includes("successfully");
                  const isCreatedField = line.startsWith("✔");

                  let colorClass = "text-slate-300";
                  if (isPrompt) colorClass = "text-emerald-400 font-semibold";
                  else if (isError) colorClass = "text-red-400";
                  else if (isSuccess) colorClass = "text-emerald-500 dark:text-emerald-400 font-semibold";
                  else if (isCreatedField) colorClass = "text-teal-400/90 dark:text-teal-400";

                  return (
                    <div key={idx} className={`${colorClass} leading-relaxed`}>
                      {line}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulated compiler stats tagline footer */}
            <div className="border-t border-slate-800/80 pt-4 mt-6 flex justify-between text-[10px] text-slate-500 select-none">
              <span>CONFIG: GEMINI_2.5_PRO</span>
              <span>HOST: VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
