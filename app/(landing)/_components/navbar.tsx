import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-14 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div
          className="space-x-4 md:block md:w-auto flex items-center
          justify-between w-full"
        >
          <Button
            variant="outline"
            className={cn("outline outline-2 mb-2 mt-2 px-2 py-1 rounded-lg text-lg text-black hover:bg-slate-300", headingFont.className)}
            asChild
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button
            variant="default"
            className={cn(
              "mb-2 mt-2 px-2 py-1 rounded-lg bg-black text-lg text-white hover:bg-slate-700",
              headingFont.className
            )}
            asChild
          >
            <Link href="/sign-up">Get Task Manager for free</Link>
            
          </Button>
        </div>
      </div>
    </div>
  );
};
