import { IProject } from "@/types/projects";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import React from "react";
const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
})
interface ProjectsProps {
    project: IProject;
  }

  const Project: React.FC<ProjectsProps> = ({ project }) => {
    return (
      <tr key={project.id}>
        <td
          className={cn(
            "text-left pl-5 pr-10 ",
            headingFont.className
          )}
        >
          {project.text}
        </td>
        <td className="flex gap-5">
          
        </td>
      </tr>
    );
  };
  export default Project;