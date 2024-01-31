import { Button } from "@/components/ui/button";
import React from "react";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { getUserId } from "@/app/(api)/apiUser";
import { UserButton } from "@clerk/nextjs";
import Modal from "./modal";
import { ProjectDropDown } from "./projectDropDown";
import { getAllProjectsPrisma } from "@/app/(api)/apiProjects";
const headingFont = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

export const SideBar = async () => {
  const userId = await getUserId();
  const projects = await getAllProjectsPrisma();

  return (
    <>
      <div className=" h-screen bg-violet-100 pt-5 pl-2 shadow-lg">
        <div className="font-medium text-lg flex itmes-center mb-4 col-auto">
          <UserButton afterSignOutUrl="/" />
          <span className="ml-2">Dashboard</span>
        </div>

        <div className="flex items-center justify-between w-full mr-2">
          <Button
            variant="outline"
            className={cn(
              "pl-2 block h-full w-full rounded-sm text-lg text-violet-950 hover:bg-violet-200 focus:bg-violet-300",
              headingFont.className
            )}
            asChild
          >
            <Link href={"/dashboard/" + userId + "/inbox/"}>Inbox</Link>
          </Button>
          <Modal project="inbox" isEditing={false} task={null}/>
          
        </div>
        <div className="flex items-center justify-between w-full mr-2">
          <Button
            variant="outline"
            className={cn(
              "pl-2 block h-full w-full rounded-sm text-lg text-violet-950 hover:bg-violet-200 focus:bg-violet-300",
              headingFont.className
            )}
            asChild
          >
            <Link href={"/dashboard/" + userId + "/today/"}>Today</Link>
          </Button>
          <Modal project="today" isEditing={false} task={null}/>
        </div>
        <ProjectDropDown projects = {projects} userId = {userId}/>
      </div>
    </>
  );
};
