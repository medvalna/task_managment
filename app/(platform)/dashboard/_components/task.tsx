import { cn } from "@/lib/utils";
import { ITask } from "@/types/tasks";
import { Poppins } from "next/font/google";
const headingFont = Poppins({
    subsets: ["latin"],
    weight: ["400"],
  });

interface TasksProps {
    task: ITask
}
const Task: React.FC<TasksProps> = ({task}) => {
    return (
        <tr key={task.id}>
                <td className={cn("text-center", headingFont.className)}>{task.text}</td>
                <td className={cn("text-center", headingFont.className)}>Blue</td>
              </tr>
    );
};
export default Task;