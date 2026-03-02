import React from "react";
import Link from "next/link";
import { Heart, Sparkles, Zap, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-[#050505] text-white">
      {/* Top Border Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

      {/* Precision Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-[500px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative p-[1px] rounded-2xl bg-gradient-to-tr from-emerald-400 to-blue-500 shadow-2xl shadow-emerald-500/10 transition-transform duration-500 group-hover:rotate-3">
                <div className="bg-black rounded-[15px] p-2.5">
                  <Image src="/genform.png" alt="GenForm" width={30} height={30} priority />
                </div>
              </div>
              <h3 className="text-3xl font-black tracking-tighter uppercase leading-none">
                Gen<span className="text-emerald-500">Form</span>
              </h3>
            </Link>
            
            <p className="text-base text-gray-400 font-medium leading-relaxed max-w-sm">
              Transform ideas into beautiful forms with AI magic. Create, customize, and share professional forms in seconds.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">AI Logic</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/5 border border-blue-500/10 rounded-full shadow-inner">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Trusted by 500+</span>
              </div>
            </div>
          </div>

          {/* Navigation with Animated Dots */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start gap-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-2">Navigate</h4>
            <ul className="space-y-4">
              {[
                { name: 'Dashboard', href: '/dashboard/forms' },
                { name: 'Analytics', href: '/dashboard/analytics' },
                { name: 'Pricing', href: '/dashboard/upgrade' },
                { name: 'Source Code', href: 'https://github.com/Amansingh0807/GenForm', external: true }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    target={link.external ? "_blank" : "_self"}
                    className="group flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-0 group-hover:opacity-75 transition-opacity"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors"></span>
                    </span>
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connectivity */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-2">Connect</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Github size={20} />, href: "https://github.com/Amansingh0807", color: "hover:bg-gray-800" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/amansingh08/", color: "hover:bg-blue-600" },
                { icon: <Twitter size={20} />, href: "https://x.com/RealAman_Singh", color: "hover:bg-black" }
              ].map((social, i) => (
                <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-500 ${social.color} hover:text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 italic">Built for the future of forms.</p>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-8">
          
          {/* Signature Badge - More Professional & Centered */}
          <div className="relative group overflow-hidden px-6 py-2.5 bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl transition-all duration-500 hover:border-emerald-500/40">
            <div className="absolute inset-0 bg-emerald-500/5 translate-y-10 group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative flex items-center gap-3">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Crafted with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">by</span>
              <a
                href="https://github.com/Amansingh0807"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-[length:200%_auto] animate-gradient-x"
              >
                AMAN SINGH
              </a>
            </div>
          </div>

          {/* Minimal Meta Info */}
          <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">
            <span>© {currentYear} GENFORM</span>
            <div className="h-1 w-1 rounded-full bg-emerald-500/20"></div>
            <span className="text-gray-500 hover:text-emerald-400 transition-colors">Privacy</span>
            <div className="h-1 w-1 rounded-full bg-emerald-500/20"></div>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;