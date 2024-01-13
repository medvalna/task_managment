import { getAllTodos } from "@/app/(api)/apiTasks";
import Modal from "../../_components/modal";
import TodoList from "../../_components/todoList";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import ModalProject from "../../_components/modalProjects";
import DeleteButton from "../../_components/deleteButton";
import { getUserId } from "@/app/(api)/apiUser";


const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const ProjectPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const projectName = searchParams["name"] ?? "";
  const projectId = searchParams["id"] ?? "";
  const userId =await getUserId();
  const tasks = await getAllTodos(`${projectName}`);
 
  return (
    <div className=" bg-violet-50 h-screen w-screen">
      <div className="text-left my-5 mx-5 flex space-x-2">
        <div className={cn("text-2xl text-violet-950", headingFont.className)}>
          {projectName}
        </div>
        <Modal project={projectName} />
        <ModalProject
          isEditing={true}
          projectName={projectName}
          projectId={projectId}
          userId={userId}
        />
        <DeleteButton projectId={projectId} projectName={projectName}/>
        
      </div>
      <TodoList tasks={tasks} project={projectName} />
    </div>
  );
};

export default ProjectPage;
