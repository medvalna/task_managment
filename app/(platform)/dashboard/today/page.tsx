import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Modal from "../_components/modal";
import TodoList from "../_components/todoList";
import { getAllTodos } from "@/api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
const DashboardPage = async () => {
  const tasks = await getAllTodos();
  console.log(tasks);

const confirmationModalOpen = Boolean;
  return (
    <div className=" bg-violet-50 h-screen w-screen">
      <div className="text-left my-5 mx-5 flex space-x-2">
        <div className={cn("text-2xl text-violet-950", headingFont.className)}>
          Today
        </div>
      </div>
      <TodoList tasks={tasks} />
    </div>
  );
};

export default DashboardPage;
