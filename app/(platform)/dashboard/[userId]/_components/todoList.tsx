import { ITask } from "@/types/tasks";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Task from "./task";
import Modal from "./modal";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
interface TodoListProps {
  tasks: ITask[];
  project: string;
}
const TodoList: React.FC<TodoListProps> = ({ tasks, project }) => {
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
            {Array.isArray(tasks) && tasks.length
              ? tasks.map((task) => <Task key={task.id} task={task} />)
              : null}
          </tbody>
          
        </table>
        
      </div>
      <div className="border-b-2 border-gray-300 mr-60 ml-24"></div>
      <div className="float-right mr-60">
        <Modal project = {project}/>
      </div>
    </>
  );
};

export default TodoList;
