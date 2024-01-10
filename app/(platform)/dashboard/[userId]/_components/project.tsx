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
    <li key={project.id}>
      <Button
        asChild
        className={cn("text-left text-violet-950 py-1", headingFont.className)}
      >
        <Link href={{pathname: "/dashboard/"+userId+"/project/" + project.id, query:project.text }}> {project.text}</Link>
        
      </Button>
    </li>
  );
};
export default Project;
