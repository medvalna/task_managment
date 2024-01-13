import { ITask } from "@/types/tasks";
import Task from "./task";
import Modal from "./modal";

interface TodoListProps {
  tasks: ITask[];
  project: string;
}
const TodoList: React.FC<TodoListProps> = ({ tasks, project }) => {
  return (
    <>
      <div className=" ml-24 mt-12 mb-5">
        <table className="table-fixed w-full">
          <tbody>
            {Array.isArray(tasks) && tasks.length
              ? tasks.map((task) => <Task key={task.id} task={task} />)
              : null}
          </tbody>
        </table>
        <div className="border-b-2 border-gray-300 mr-60"></div>
        <div className="flex">
          <div className="w-3/4"></div>
          <div className="w-1/4">
            <Modal project={project} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
