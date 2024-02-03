import { ITask } from "@/types/tasks";
import Task from "./task";

interface TodoListProps {
	tasks: ITask[];
	project: string;
}
const TodoList: React.FC<TodoListProps> = ({ tasks, project }) => {
	return (
		<>
			<div className=" ml-24 mt-12 mr-40 mb-5">
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
