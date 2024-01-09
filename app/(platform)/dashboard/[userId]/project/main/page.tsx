import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import ModalProject from "../../_components/modalProjects";
import { getAllProjects } from "@/app/apiProjects";
import ProjectList from "../../_components/projectList";
const headingFont = Poppins({
    subsets: ["latin"],
    weight: ["400"],
  });
const ProjectHomePage = async () => {
  const projects = await getAllProjects();
  return (
    <div className=" bg-violet-50 h-screen w-screen">
      <div className="text-left my-5 mx-5 flex space-x-2">
        <div className={cn("text-2xl text-violet-950", headingFont.className)}>
          My Projects
        </div>
        <ModalProject/>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
};

export default ProjectHomePage;