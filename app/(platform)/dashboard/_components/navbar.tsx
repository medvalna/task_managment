import { Logo } from "@/components/logo";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Plus } from "lucide-react";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4 md:max-w-screen-2xl md:mx-auto md:w-full md:justify-between">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <div
          className="space-x-4 md:w-auto flex items-center
          justify-between w-full"
        >
          <Button
            variant="outline"
            className={cn(
              "hidden md:block h-auto mb-2 mt-2 px-2 py-1.5 rounded-lg text-lg bg-black text-white hover:bg-green-400",
              headingFont.className
            )}
          >
            Create
          </Button>
          <Button
            variant="outline"
            className={cn(
              "block md:hidden h-auto mb-2 mt-2 px-2 py-2 rounded-lg text-lg bg-black text-white hover:bg-green-400",
              headingFont.className
            )}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};
