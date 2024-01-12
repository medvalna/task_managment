import { getAllTodos } from "@/app/(api)/apiTasks";
import Modal from "../../_components/modal";
import TodoList from "../../_components/todoList";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRouter} from "next/navigation";
import ModalProject from "../../_components/modalProjects";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const ProjectPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const pageName= searchParams["name"] ?? "";
  const pageID= searchParams["id"] ?? "";
  const tasks = await getAllTodos(`${pageName}`);
  return (
    <div className=" bg-violet-50 h-screen w-screen">
      <div className="text-left my-5 mx-5 flex space-x-2">
        <div className={cn("text-2xl text-violet-950", headingFont.className)}>
          {pageName}
        </div>
        <Modal project= {pageName}/>
        <ModalProject isEditing = {true} projectName = {pageName} projectId = {pageID}/>
      </div>
      <TodoList tasks={tasks} project= {pageName} />
    </div>
  );
};

export default ProjectPage;
