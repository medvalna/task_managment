import { IProject } from "@/types/projects";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import ModalProject from "./modalProjects";
import Project from "./project";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

interface ProjectListProps {
  projects: IProject[];
}
const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <>
      <div className="flex items-left gap-6 mx-24 mt-12 mb-5">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th
                className={cn(
                  "text-left text-lg w-auto",
                  headingFont.className
                )}
              >
                Task
              </th>
              <th className={cn("text-left", headingFont.className)}>
                Actions
              </th>
            </tr>
            
          </thead>
          
          <tbody>
            {Array.isArray(projects) && projects.length
              ? projects.map((project) => <Project key={project.id} project={project} />)
              : null}
          </tbody>
          
        </table>
        
      </div>
      <div className="border-b-2 border-gray-300 mr-60 ml-24"></div>
      <div className="float-right mr-60">
        <ModalProject />
      </div>
    </>
  );
};

export default ProjectList;
