import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import Modal from "../_components/modal";
import TodoList from "../_components/todoList";
import { getAllTodosPrisma } from "@/app/(api)/apiTasks";
import {
	addProjectPrisma,
	checkifExistsProjectsPrisma,
} from "@/app/(api)/apiProjects";

const headingFont = Open_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});
const InboxPage = async ({ params }: { params: { userId: string } }) => {
	if (!(await checkifExistsProjectsPrisma(params.userId + "inbox"))) {
		await addProjectPrisma(params.userId + "inbox", "inbox");
	}
	const tasks = await getAllTodosPrisma(params.userId + "inbox", params.userId);
	return (
		<div className="  bg-violet-50 h-screen w-screen">
			<div className="ml-24 mr-40 mt-10 text-left flex space-x-2">
				<div
					className={cn(
						"text-2xl text_slate-900 font-medium",
						headingFont.className,
					)}
				>
					Inbox
				</div>
				<Modal
					projectId={params.userId + "inbox"}
					isEditing={false}
					task={null}
				/>
			</div>
			<TodoList tasks={tasks} project="inbox" />
		</div>
	);
};

export default InboxPage;
