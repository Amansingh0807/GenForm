"use strict";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, 
  Github, 
  Linkedin, 
  Twitter, 
  ArrowUpRight,
  Terminal,
  Copy,
  Check,
  Cpu,
  Globe,
  Clock
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface PromptSeed {
  id: string;
  title: string;
  prompt: string;
  category: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const promptSeeds: PromptSeed[] = [
    {
      id: "feedback",
      title: "Customer Feedback Form",
      category: "Marketing",
      prompt: "Create a customer feedback form with name, email, rating from 1 to 5, and a comments text area"
    },
    {
      id: "rsvp",
      title: "Event RSVP Form",
      category: "Events",
      prompt: "Generate a beautiful wedding RSVP form with meal preferences (vegan, meat, fish), guest counts, and dietary restrictions"
    },
    {
      id: "job",
      title: "Job Application Form",
      category: "HR / Operations",
      prompt: "Create a structured job application form with full name, portfolio link, expected salary, and resume upload field"
    }
  ];

  // Set local clock and greeting dynamically on client side
  useEffect(() => {
    setIsMounted(true);
    
    const updateTimeAndGreeting = () => {
      const now = new Date();
      
      // Clock format: HH:MM:SS
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
      // Dynamic greetings based on hour
      const hrs = now.getHours();
      if (hrs < 12) setGreeting("Good Morning");
      else if (hrs < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPrompt = (seed: PromptSeed) => {
    navigator.clipboard.writeText(seed.prompt);
    setCopiedId(seed.id);
    toast.success(`Copied seed: "${seed.title}"`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <footer className="relative w-full overflow-hidden bg-slate-50 dark:bg-[#070c14] text-gray-600 dark:text-gray-300 border-t border-emerald-100 dark:border-emerald-950/40 transition-colors duration-300">
      
      {/* Top glowing line accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 dark:via-emerald-500/50 to-blue-500/0" />

      {/* Atmospheric backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-30 select-none">
        {/* Neon blurred blobs */}
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse duration-[8s]" />
        <div className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse duration-[10s]" />
        
        {/* Subtle grid lines background overlay */}
        <div 
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(16,185,129,0.15) 1px, transparent 1px)`,
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Modular Grid Panel Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          
          {/* LEFT PANEL: Branding & Live status console */}
          <div className="lg:col-span-4 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white dark:bg-gray-950/80 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center overflow-hidden transition-colors shadow-sm dark:shadow-none">
                <Image 
                  src="/genform.png" 
                  alt="GenForm Logo" 
                  width={36} 
                  height={36} 
                  priority 
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold font-syne tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                  GenForm <span className="text-emerald-600 dark:text-emerald-500 text-xs font-mono font-normal border border-emerald-200 dark:border-emerald-500/30 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20">v0.1.1</span>
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-mono tracking-widest uppercase mt-0.5">AI Form Orchestrator</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed max-w-sm">
              Transforming descriptive natural language inputs into optimized, high-conversion user interfaces instantly with Gemini.
            </p>

            {/* LIVE SYSTEM STATUS PANEL */}
            <div className="w-full max-w-sm rounded-xl bg-white/85 dark:bg-gray-950/60 border border-emerald-100 dark:border-emerald-950/60 p-4 font-mono text-xs text-left space-y-3 shadow-md dark:shadow-2xl backdrop-blur-md transition-colors">
              <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-950/40 pb-2">
                <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" /> SYSTEM CORE
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span className="font-bold">ACTIVE</span>
                </span>
              </div>
              
              <div className="space-y-1 text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span className="text-gray-400 dark:text-gray-500">ENGINE:</span>
                  <span>GEMINI-2.5-PRO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 dark:text-gray-500">DATABASE:</span>
                  <span className="flex items-center gap-1">POSTGRESQL <Globe className="w-3 h-3 text-blue-500 dark:text-blue-400" /></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 dark:text-gray-500">CLIENT TIME:</span>
                  <span className="text-gray-900 bg-slate-100 border border-slate-200 dark:text-white dark:bg-gray-900 dark:border-gray-800 px-1.5 py-0.5 rounded flex items-center gap-1 min-w-[90px] justify-center transition-colors">
                    <Clock className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                    {isMounted ? time : "00:00:00"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE PANEL: Prompt Seed Deck */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-emerald-100 dark:border-emerald-950/30 pb-3">
              <Terminal className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono">
                PROMPT GENERATION DECK
              </h4>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans mb-2">
              Select and copy preset semantic parameters to kickstart your form design inside the dashboard:
            </p>

            <div className="space-y-3">
              {promptSeeds.map((seed) => (
                <div 
                  key={seed.id}
                  onClick={() => handleCopyPrompt(seed)}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800/80 bg-white/60 dark:bg-gray-950/40 p-3 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/10 transition-all duration-300 shadow-sm hover:shadow dark:shadow-none"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-800/20 px-1.5 py-0.5 rounded transition-colors">
                      {seed.category}
                    </span>
                    <span className="text-gray-400 dark:text-gray-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {copiedId === seed.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                      )}
                    </span>
                  </div>
                  <h5 className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-950 group-hover:dark:text-white transition-colors font-syne">
                    {seed.title}
                  </h5>
                  <p className="text-[11px] text-gray-500 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-400 line-clamp-1 mt-1 transition-colors font-mono italic">
                    &ldquo;{seed.prompt}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: Modular Navigation Grid */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 border-b border-emerald-100 dark:border-emerald-950/30 pb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono">
                CONSOLE INDEX
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/dashboard/forms"
                className="group flex flex-col justify-between p-4 bg-white/60 border border-gray-200 dark:bg-gray-950/30 dark:border-gray-800/60 rounded-xl hover:border-emerald-500/40 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10 transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-500">01 /</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-950 dark:group-hover:text-white font-syne mt-2 flex items-center justify-between transition-colors">
                  Forms <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </span>
              </Link>

              <Link 
                href="/dashboard/analytics"
                className="group flex flex-col justify-between p-4 bg-white/60 border border-gray-200 dark:bg-gray-950/30 dark:border-gray-800/60 rounded-xl hover:border-blue-500/40 hover:bg-blue-50/20 dark:hover:bg-blue-950/10 transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <span className="text-[10px] font-mono text-blue-500 dark:text-blue-400">02 /</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-950 dark:group-hover:text-white font-syne mt-2 flex items-center justify-between transition-colors">
                  Stats <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </span>
              </Link>

              <Link 
                href="/dashboard/upgrade"
                className="group flex flex-col justify-between p-4 bg-white/60 border border-gray-200 dark:bg-gray-950/30 dark:border-gray-800/60 rounded-xl hover:border-cyan-500/40 hover:bg-cyan-50/20 dark:hover:bg-cyan-950/10 transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">03 /</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-950 dark:group-hover:text-white font-syne mt-2 flex items-center justify-between transition-colors">
                  Pro <ArrowUpRight className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </span>
              </Link>

              <a 
                href="https://github.com/Amansingh0807/GenForm"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-4 bg-white/60 border border-gray-200 dark:bg-gray-950/30 dark:border-gray-800/60 rounded-xl hover:border-emerald-500/40 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10 transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">04 /</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-950 dark:group-hover:text-white font-syne mt-2 flex items-center justify-between transition-colors">
                  Source <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </span>
              </a>
            </div>
            
            {/* Social handles links */}
            <div className="flex gap-2.5 pt-2">
              <a
                href="https://github.com/Amansingh0807"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 flex items-center justify-center hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/amansingh08/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 flex items-center justify-center hover:border-blue-500/50 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://x.com/RealAman_Singh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 flex items-center justify-center hover:border-gray-900 dark:hover:border-emerald-400/50 dark:hover:bg-emerald-950/20 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <Twitter className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="h-px bg-gradient-to-r from-emerald-200/20 via-emerald-200/60 to-emerald-200/20 dark:from-emerald-950/20 dark:via-emerald-900/40 dark:to-emerald-950/20 mb-8 transition-colors" />

        {/* BOTTOM METADATA BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500 dark:text-gray-400 font-mono">
          
          {/* Left info: copyright and greeting */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
            <span>© {currentYear} <span className="text-gray-800 dark:text-gray-300 font-syne font-bold">GENFORM</span></span>
            <span className="hidden sm:inline text-gray-200 dark:text-gray-800">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {isMounted ? greeting : "System Connected"}
            </span>
            <span className="hidden sm:inline text-gray-200 dark:text-gray-800">|</span>
            <span>All rights reserved.</span>
          </div>

          {/* Right info: craftsmanship credit */}
          <div className="flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-gray-950/80 border border-emerald-100 dark:border-emerald-950/50 rounded-full shadow-md dark:shadow-lg transition-colors">
            <span>CRAFTED WITH</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>BY</span>
            <a
              href="https://github.com/Amansingh0807"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 dark:from-emerald-400 dark:to-blue-400 dark:hover:from-emerald-300 dark:hover:to-blue-300 transition-all font-syne"
            >
              AMAN SINGH
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
