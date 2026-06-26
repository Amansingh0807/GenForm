"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, CheckCircle, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import PricingPage from "./PricingPage";
import Footer from "./Footer";
import FaqSection from "./faq/FaqSection";
import HowItWorks from "./landing/HowItWorks";
import Testimonials from "./landing/Testimonials";
import Features from "./landing/Features";
import Stats from "./landing/Stats";

interface LandingPageProps {
  userId?: string | null;
}

const LandingPage = ({ userId }: LandingPageProps) => {
  // Track which FAQ item is open. Using React state lets us control
  // animations and click targets precisely (we replaced native
  // <details>/<summary> so the whole header is clickable).


  return (
    <div id="home" className="min-h-screen">
      {/* Hero Section with Background Pattern */}
      <div className="relative overflow-hidden bg-white dark:bg-gray-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-green-500/10 dark:bg-green-500/5 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-500/5 dark:bg-teal-500/5 blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">
                AI-Powered Form Builder
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-2">
              Create Forms in
              <span className="text-green-500 dark:text-green-400">
                {" "}
                Seconds
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Transform your ideas into beautiful, functional forms with the
              power of AI. No coding required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
              <Link
                href={userId ? "/dashboard/analytics" : "/sign-up"}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg shadow-green-500/30"
                >
                  {userId ? "Go to Dashboard" : "Start Creating Free"}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Link href="/demo" className="w-full sm:w-auto">

                {/* <Link href="/dashboard/forms" className="w-full sm:w-auto"> */}
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10"
                >
                  <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  See a Demo form
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span>Safe and Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span>Freemium plans</span>
              </div>
            </div>
          </div>
        </div>

        <Features />

          {/* How It Works Section */}
          <HowItWorks />

          <Stats />


          {/* Testimonials Section */}
          <Testimonials />

        <FaqSection />

        {/* Pricing Section */}
        <div id="pricing" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <PricingPage userId={userId ?? undefined} />
        </div>

        {/* CTA Section */}
        <div className="relative z-10 py-12 sm:py-16 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Atmospheric background glow */}
          <div className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-30 overflow-hidden select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-[80px] sm:blur-[120px] animate-pulse duration-[8s]" />
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800/80 bg-white/80 dark:bg-gray-950/60 p-8 sm:p-12 md:p-16 text-center shadow-xl dark:shadow-2xl backdrop-blur-md transition-colors duration-300">
            {/* Subtle card grid lines */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 select-none" 
              style={{ 
                backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.15) 1px, transparent 1px)", 
                backgroundSize: "20px 20px" 
              }} 
            />

            {/* Title in Syne typography */}
            <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold font-syne text-gray-900 dark:text-white tracking-tight leading-tight mb-4 max-w-2xl mx-auto">
              Ready to Build Your Next Form?
            </h2>

            {/* Sub-paragraph */}
            <p className="relative z-10 text-sm sm:text-base text-gray-500 dark:text-gray-400 font-sans mb-8 max-w-xl mx-auto leading-relaxed">
              Transform descriptive raw text queries into fully optimized, responsive, and functional form interfaces in under 5 seconds.
            </p>

            {/* Telemetry Metric Capsules in Space Mono */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 font-mono text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800/80 rounded-lg shadow-sm dark:shadow-none transition-colors">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                DEPLOY TIME: &lt; 5s
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800/80 rounded-lg shadow-sm dark:shadow-none transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                ZERO CODE NEEDED
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800/80 rounded-lg shadow-sm dark:shadow-none transition-colors">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                OPTIMIZED CONVERSION
              </div>
            </div>

            {/* Main Action Call */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto font-syne font-bold px-8 py-6 text-sm sm:text-base text-white bg-emerald-600 hover:bg-emerald-500 border-none transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 group cursor-pointer rounded-xl"
                >
                  <span className="hidden sm:inline">
                    Create Your First Form - It&apos;s Free
                  </span>
                  <span className="sm:hidden">Get Started Free</span>
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* Footer */}

        <Footer />
        {/* <div className="relative z-10 border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600 dark:text-gray-400">
              © 2025 GenForm. All rights reserved.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
