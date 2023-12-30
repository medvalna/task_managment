import { Check } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Chicle } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headingFont = Chicle({
  subsets: ["latin"],
  weight: ["400"],
});
const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const LandingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-8 flex items-center border shadow-sm p-4 bg-cyan-100 text-cyan-700 rounded-full uppercase">
          <Check className={cn("h-6 w-6 mr-2", textFont.className )}/>
          The best task manager
        </div>
        <h1 className={cn("text-5xl md:text-6xl text-center text-cyan-700 mb-6", headingFont.className)}>
          Task manager helps you achieve your goals
        </h1>
        <div className={cn("text-3xl md:text-6xl bg-gradient-to-r from-cyan-500 to-green-500 text-white p-2 px-6 rounded-lg pb-4 w-fit", headingFont.className)}>
          work forward
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-gray-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        We're excited to introduce <b>Task Manager</b>, the ultimate tool for
        managing tasks and improving productivity. Manage your tasks
        efficiently, prioritize them effectively, and collaborate with your team
        seamlessly!
      </div>

      <Button className="mt-6 h-12 w-64 group relative overflow-hidden rounded-lg bg-black text-lg shadow">
      
        <span
          className={cn(
            "text-3xl relative text-cyan-300 group-hover:text-cyan-500 py-6 px-6",
            headingFont.className
          )}
        >
          <Link href="/auth">Get Task Manager!</Link>
        </span>
      </Button>
    </div>
  );
};

export default LandingPage;
