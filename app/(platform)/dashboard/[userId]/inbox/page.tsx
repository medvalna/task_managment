import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Modal from "../_components/modal";
import TodoList from "../_components/todoList";
import { getAllTodos } from "@/app/(api)/apiTasks";

const headingFont = Inter({
  subsets: ["latin"],
  weight: ["400"],
});
const DashboardPage = async () => {

  const tasks = await getAllTodos("inbox");
  return (
    <div className=" bg-violet-50 h-screen w-screen">
      <div className="text-left my-5 mx-5 flex space-x-2">
        <div className={cn("text-2xl text-violet-900", headingFont.className)}>
          Inbox
        </div>
        <Modal project="inbox" isEditing={false} task={null}/>
      </div>
      <TodoList tasks={tasks} project="inbox"/>
    </div>
  );
};

export default DashboardPage;
