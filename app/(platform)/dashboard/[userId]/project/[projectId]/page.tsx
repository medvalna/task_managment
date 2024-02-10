import { getAllTodosPrisma } from "@/app/(api)/apiTasks";

import TodoList from "../../_components/todoList";

import { getProjectById } from "@/app/(api)/apiProjects";
import DashboardTitle from "../../_components/dashboardTitle";

const ProjectPage = async ({
	params,
}: {
	params: { userId: string; projectId: string };
}) => {
	const projectId = params.projectId;
	const project = await getProjectById(projectId);
	const projectName = project?.text;
	const userId = params.userId;
	const tasks = await getAllTodosPrisma(projectId, userId);

	return (
		<div className=" bg-violet-50 h-screen w-screen">
			<div className="text-left my-5 mx-5 flex space-x-2">
				<DashboardTitle
					projectId={projectId}
					projectName={projectName}
					userId={userId}
				/>
			</div>
			<TodoList tasks={tasks} project={projectName} />
		</div>
	);
};

export default ProjectPage;
