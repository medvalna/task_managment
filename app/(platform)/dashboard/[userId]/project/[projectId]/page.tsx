import { getAllTodos } from "@/app/(api)/apiTasks";
import Modal from "../../_components/modal";
import TodoList from "../../_components/todoList";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const ProjectPage = async () => {
  
  const tasks = await getAllTodos(`sport`);
  //const router = useRouter();
 
  return (
    <div className=" bg-violet-50 h-screen w-screen">
      <div className="text-left my-5 mx-5 flex space-x-2">
        <div className={cn("text-2xl text-violet-950", headingFont.className)}>
          Sport
        </div>
        <Modal />
      </div>
      <TodoList tasks={tasks} />
    </div>
  );
};

export default ProjectPage;
