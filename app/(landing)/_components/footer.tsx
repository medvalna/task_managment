import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

const headingFont = Inter({
  subsets: ["latin"],
  weight: ["400"],
});
export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 px-14 border-t bg-slate-100">
      <div className="md:max-w-screnn-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div
          className="space-x-4 md:block md:w-auto flex items-center
          justify-between w-full"
        >
          <Button variant="ghost" className={cn(headingFont.className)}>
            Privacy Policy
          </Button>
          <Button className={cn(headingFont.className)} variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
