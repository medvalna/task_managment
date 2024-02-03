import { getAllTodaysTodosPrisma } from "@/app/(api)/apiTasks";
import Modal from "../_components/modal";
import TodoList from "../_components/todoList";
import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const headingFont = Open_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});

const TodayPage = async ({ params }: { params: { userId: string } }) => {
	const projectName = "inbox";
	const tasks = await getAllTodaysTodosPrisma(params.userId);

	return (
		<div className=" bg-violet-50 h-screen w-screen">
			<div className="text-left my-5 mx-5 flex space-x-2">
				<div
					className={cn(
						"text-2xl text_slate-900 font-medium",
						headingFont.className,
					)}
				>
					Today
				</div>

				<Modal project={projectName} isEditing={false} task={null} />
			</div>
			<TodoList tasks={tasks} project={"inbox"} />
		</div>
	);
};

export default TodayPage;
