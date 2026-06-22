import { DarkMode } from "@/components/DarkMode";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
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
      <header className="border-b dark:border-slate-800 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <nav className="flex items-center justify-between max-w-7xl mx-auto py-2 px-4">
          <Logo />

          {/* This component now handles the desktop links and active state */}
          <ActiveNavbar />

          <div className="hidden md:flex items-center gap-2">
            <DarkMode />
            {user ? (
              <>
                <Link href="/dashboard/analytics">
                  <Button variant="link">Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
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
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex flex-col gap-2 border-b pb-4">
                    {["Home", "Features", "Testimonials", "FAQs", "Pricing"].map((item) => (
                      <SheetClose key={item} asChild>
                        <Link 
                          href={`#${item.toLowerCase()}`} 
                          className="text-sm font-medium px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                        >
                          {item}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  {user ? (
                    <>
                      <Link href={"/dashboard/analytics"}>
                        <Button variant={"ghost"} className="w-full justify-start">Dashboard</Button>
                      </Link>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-sm font-medium">Account</span>
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href={"/sign-in"}>
                        <Button variant={"ghost"} className="w-full justify-start">Sign In</Button>
                      </Link>
                      <Link href="/sign-up">
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                          Get Started
                        </Button>
                      </Link>
                    </>
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