"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQs", href: "#faqs" },
  { name: "Pricing", href: "#pricing" },
];

export const ActiveNavbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.href.replace("#", ""),
        element: document.getElementById(item.href.replace("#", "")),
      }));

      let currentSection = "home";

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          // Check if section is in the upper half of the viewport
          if (rect.top <= window.innerHeight / 2) {
            currentSection = section.id;
          } else {
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Set initial active section
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hidden md:flex items-center gap-1 mx-auto bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 backdrop-blur-md rounded-full px-1 py-1">
      {navItems.map((item) => {
        const isActive = activeSection === item.href.replace("#", "");
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
              isActive
                ? "bg-green-500 text-white shadow-md shadow-green-500/20" 
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};