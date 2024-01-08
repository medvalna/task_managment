import { ITask } from "@/types/tasks";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Task from "./task";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
interface TodoListProps {
  tasks: ITask[];
}
const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="">
      <table className="table w-auto">
        {/* head */}
        <thead>
          <tr>
            <th className={cn("text-center text-lg", headingFont.className)}>
              Task
            </th>
            <th className={cn("text-center", headingFont.className)}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(tasks) && tasks.length) ? tasks.map((task) => (
            <Task key={task.id} task={task} />
          )): null}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
