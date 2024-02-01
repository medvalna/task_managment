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
				<ul>
					{Array.isArray(tasks) && tasks.length
						? tasks.map((task) => <Task key={task.id} task={task} />)
						: null}
				</ul>
			</div>
		</>
	);
};

export default TodoList;
