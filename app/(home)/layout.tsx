import { DarkMode } from "@/components/DarkMode";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ActiveNavbar } from "@/components/ActiveNavbar"; // Import our new component

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  return (
    <div>
      <header className="border-b border-gray-200/80 dark:border-slate-800/80 sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-colors duration-300">
        <nav className="flex items-center justify-between max-w-7xl mx-auto py-2 px-4">
          <Logo />

          {/* This component now handles the desktop links and active state */}
          <ActiveNavbar />

          <div className="hidden md:flex items-center gap-3">
            <DarkMode />
            {user ? (
              <>
                <Link href="/dashboard/analytics">
                  <Button variant="ghost" className="font-syne font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
                    Dashboard
                  </Button>
                </Link>
                <div className="border-l border-slate-200 dark:border-slate-800 h-5 my-auto" />
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="font-syne font-semibold">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold px-5 py-2.5 rounded-full shadow-lg shadow-emerald-600/10 border-none transition-all duration-300 hover:scale-[1.02]">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <DarkMode />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[280px] sm:w-[320px] bg-slate-950/95 dark:bg-black/95 text-slate-100 border-l border-slate-800/80 backdrop-blur-md flex flex-col justify-between p-6">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex flex-col gap-3 mt-8">
                    <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-2 px-4">[ MENU_NAVIGATION ]</div>
                    {["Home", "Features", "Testimonials", "FAQs", "Pricing"].map((item, idx) => (
                      <SheetClose key={item} asChild>
                        <Link 
                          href={`#${item.toLowerCase()}`} 
                          className="group flex items-center gap-3 font-syne font-medium text-sm px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent hover:border-slate-800/60 rounded-xl transition-all duration-300"
                        >
                          <span className="font-mono text-[10px] text-emerald-500/80">[ 0{idx + 1} ]</span>
                          <span>{item}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  {user ? (
                    <div className="flex flex-col gap-4 mt-auto pt-6 border-t border-slate-800/60">
                      <div className="flex items-center justify-between px-2">
                        <span className="font-mono text-xs text-gray-400">[ DEV_USER ]</span>
                        <UserButton afterSignOutUrl="/" />
                      </div>
                      <SheetClose asChild>
                        <Link href="/dashboard/analytics">
                          <Button variant="ghost" className="w-full text-slate-300 hover:text-white justify-center border border-slate-800/80 hover:bg-slate-900/60 rounded-xl">
                            Dashboard Console
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-slate-800/60">
                      <SheetClose asChild>
                        <Link href="/sign-in">
                          <Button variant="ghost" className="w-full text-slate-300 hover:text-white justify-center border border-transparent hover:bg-slate-900/60 rounded-xl">
                            Sign In
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/sign-up" className="w-full">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold rounded-xl shadow-lg shadow-emerald-500/10">
                            Get Started
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default layout;