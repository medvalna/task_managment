import { IProject } from "@/types/projects";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
interface ProjectsProps {
  project: IProject;
  userId: string;
}

const Project: React.FC<ProjectsProps> = ({ project, userId }) => {
  return (
    <li key={project.id} className="flex items-center space-x-4 md:w-auto justify-between w-full">
      <Button
        asChild
        className={cn("pl-2 block h-full w-full rounded-sm text-lg text-violet-950 hover:bg-violet-200 focus:bg-violet-300", headingFont.className)}
      >
        <Link href={{pathname: "/dashboard/"+userId+"/project/" + project.id, query:{name: project.text, id:project.id} }}> {project.text}</Link>
        
      </Button>
    </li>
  );
};
export default Project;
