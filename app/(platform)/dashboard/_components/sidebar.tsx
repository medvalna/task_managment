import { Button } from "@/components/ui/button";
import React from "react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { UserButton } from "@clerk/nextjs";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export const SideBar = () => {
  return (
    <>
      <div className=" h-screen bg-violet-100 pt-5 pl-2 shadow-lg">
        <div className="font-medium text-lg flex itmes-center mb-4 col-auto">
          <UserButton afterSignOutUrl="/" />
          <span className="ml-2">Dashboard</span>
        </div>
        
        <div className="flex items-center space-x-4 md:w-auto justify-between w-full">
          <Button
            variant="outline"
            className={cn(
              "pl-2 block h-full w-full rounded-sm text-lg text-violet-950 hover:bg-violet-300",
              headingFont.className
            )}
            asChild
          >
            <Link href="/dashboard/today"> Today</Link>
          </Button>
        </div>
        <div className="flex items-center space-x-4 md:w-auto justify-between w-full">
          <Button
            variant="outline"
            className={cn(
              "pl-2 block h-full w-full rounded-sm text-lg text-violet-950 hover:bg-violet-300",
              headingFont.className
            )}
            asChild
          >
            <Link href="/dashboard/project">Project</Link>
          </Button>
        </div>
      </div>
    </>
  );
};
