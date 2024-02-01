import { getAllTodaysTodosPrisma } from "@/app/(api)/apiTasks";
import Modal from "../_components/modal";
import TodoList from "../_components/todoList";
import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import ModalProject from "../_components/modalProjects";
import DeleteButton from "../_components/deleteButton";
import { getUserId } from "@/app/(api)/apiUser";

const headingFont = Open_Sans({
	subsets: ["latin"],
	weight: ["400"],
});

const TodayPage = async () => {
	const projectName = "inbox";
	const projectId = "123";
	const userId = await getUserId();
	const tasks = await getAllTodaysTodosPrisma();

	return (
		<div className=" bg-violet-50 h-screen w-screen">
			<div className="text-left my-5 mx-5 flex space-x-2">
				<div className={cn("text-2xl text-black", headingFont.className)}>
					{projectName}
				</div>
				<Modal project={projectName} isEditing={false} task={null} />
				<ModalProject
					isEditing={true}
					projectName={projectName}
					projectId={projectId}
					userId={userId}
				/>
				<DeleteButton projectId={projectId} projectName={projectName} />
			</div>
			<TodoList tasks={tasks} project={"inbox"} />
		</div>
	);
};

export default TodayPage;
