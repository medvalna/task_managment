import { getAllTodosPrisma } from "@/app/(api)/apiTasks";
import Modal from "../../_components/modal";
import TodoList from "../../_components/todoList";
import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import ModalProject from "../../_components/modalProjects";
import DeleteButton from "../../_components/deleteButton";
import { getProjectById } from "@/app/(api)/apiProjects";

const headingFont = Open_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});

const ProjectPage = async ({
	params,
}: {
	params: { userId: string; projectId: string };
}) => {
	const projectId = params.projectId;
	const project = await getProjectById(projectId);
	const projectName = project.text;
	const userId = params.userId;
	const tasks = await getAllTodosPrisma(projectId, userId);

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
				<Modal isEditing={false} task={null} projectId={projectId} />
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
