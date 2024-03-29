import { getAllTodosPrisma } from "@/app/(api)/apiTasks";
import Modal from "../../_components/modal";
import TodoList from "../../_components/todoList";
import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import ModalProject from "../../_components/modalProjects";
import DeleteButton from "../../_components/deleteButton";
import { getUserId } from "@/app/(api)/apiUser";

const headingFont = Open_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});

const ProjectPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	const projectName = searchParams["name"] ?? "";
	const projectId = searchParams["id"] ?? "";
	const userId = await getUserId();
	const tasks = await getAllTodosPrisma(`${projectName}`);

	return (
		<div className=" bg-violet-50 h-screen w-screen">
			<div className="text-left my-5 mx-5 flex space-x-2">
				<div
					className={cn(
						"text-2xl text_slate-900 font-medium",
						headingFont.className,
					)}
				>
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
			<TodoList tasks={tasks} project={projectName} />
		</div>
	);
};

export default ProjectPage;
