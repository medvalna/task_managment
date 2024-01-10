"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IProject } from "@/types/projects";
import { useState } from "react";
import { Poppins } from "next/font/google";
import ModalProject from "./modalProjects";
import ProjectList from "./projectList";
import { IoMdArrowDropdown } from "react-icons/io";
const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

interface ProjectDropDownProps {
  projects: IProject[];
  userId: string;
}

export const ProjectDropDown: React.FC<ProjectDropDownProps> = ({
  projects,
  userId
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!isOpen);
  };
  
  return (
    <>
      <div className="flex space-x-4 md:w-auto justify-between w-full mr-2">
        <Button
          variant="outline"
          className={cn(
            " pl-2 block h-full w-full rounded-sm text-lg text-violet-950 hover:bg-violet-300",
            headingFont.className
          )}
          onClick={handleOpen}
        >
          <div className="float- left flex justify-between w-full">
            Project
            <span className = "hover:text-violet-700">
              <IoMdArrowDropdown className = "w-5 h-5 mt-1 mr-2"/>
            </span>
          </div>
        </Button>

        <ModalProject />
      </div>
      {isOpen && (
        <div
          className={cn(
            "pl-5 flex space-x-4 md:w-auto justify-between w-full mr-2",
            headingFont.className
          )}
        >
          <ProjectList projects={projects} userId = {userId} />
        </div>
      )}
    </>
  );
};
