import { IProject } from "@/types/projects";
import Project from "./project";

interface ProjectListProps {
  projects: IProject[];
  userId: string;
}
const ProjectList: React.FC<ProjectListProps> = ({ projects, userId }) => {
  return (
    <ul className = "w-full">
      {Array.isArray(projects) && projects.length
        ? projects.map((project) => (
            <Project key={project.id} project={project} userId={userId} />
          ))
        : null}
    </ul>
  );
};

export default ProjectList;
