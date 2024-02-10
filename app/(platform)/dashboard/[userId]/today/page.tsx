import { getAllTodaysTodosPrisma } from "@/app/(api)/apiTasks";
import TodoList from "../_components/TodoList";
import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import NewModal from "../_components/NewModal";

const headingFont = Open_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});

const TodayPage = async ({ params }: { params: { userId: string } }) => {
	const tasks = await getAllTodaysTodosPrisma(params.userId);
	return (
		<div className=" bg-violet-50 h-screen w-screen">
			<div className="ml-24 mr-40 mt-10 text-left flex space-x-2">
				<div
					className={cn(
						"text-2xl text_slate-900 font-medium",
						headingFont.className,
					)}
				>
					Today
				</div>
				<NewModal
					projectId={params.userId + "inbox"}
					isEditing={false}
					task={null}
				/>
			</div>
			<TodoList tasks={tasks!} project={"inbox"} />
		</div>
	);
};

export default TodayPage;
