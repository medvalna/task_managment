"use client";
import { cn } from "@/lib/utils";
import { ITask } from "@/types/tasks";
import { Open_Sans } from "next/font/google";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import React, { FormEventHandler, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { deleteTodoPrisma, editTodoPrisma } from "@/app/(api)/apiTasks";
import "flatpickr/dist/themes/material_green.css";
import Modal from "./modal";
import { getProjectById } from "@/app/(api)/apiProjects";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@primer/octicons-react";
const headingFont = Open_Sans({
	subsets: ["latin"],
	weight: ["400"],
});

interface TasksProps {
	task: ITask;
}
const Task: React.FC<TasksProps> = ({ task }) => {
	const router = useRouter();
	//const project = await getProjectById(task.projectId);

	const editDateFormat = (date: Date | null | string): string => {
		if (date == null || date == undefined || date == "") {
			return "";
		}
		const line = date.toString().split("-");
		const dateFin = line.slice(0, 3);
		dateFin[2] = dateFin[2]?.slice(0, 2);
		const dateForm = new Date(dateFin.join("/"));
		const formattedDate = dateForm.toLocaleString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
		return formattedDate;
	};

	const handleDeleteTodo: MouseEventHandler<HTMLButtonElement> = async (e) => {
		e.preventDefault();
		await deleteTodoPrisma(task.id);

		router.refresh();
	};
	const handleDoneTodo: FormEventHandler<HTMLFormElement> = async (e) => {
		//e.preventDefault();

		await editTodoPrisma(
			task.id,
			task.text,
			task.projectId,
			!task.isDone,
			task.date,
		);
		router.refresh();
	};

	return (
		<li
			key={task.id}
			className="group  transition-all duration-50 border-2 my-1 border-transparent hover:border-slate-800 hover:rounded-lg flex items-center justify-between"
		>
			<div className="flex items-center px-4">
				{task.isDone ? (
					<MdCheckBox
						className="text_slate-900"
						cursor="pointer"
						size={25}
						onClick={handleDoneTodo}
					/>
				) : (
					<MdCheckBoxOutlineBlank
						className="transition-all duration-50 hover:text-slate-900 text-slate-600"
						cursor="pointer"
						size={25}
						onClick={handleDoneTodo}
					/>
				)}
				<div className="grid grid-cols-1 text_slate-900">
					<div
						className={cn(
							task.isDone ? "text_slate-900 line-through" : "text_slate-900",
							"row-span-1 text-left pl-5 pr-10 text-xl",
							headingFont.className,
						)}
					>
						{task.text}
					</div>
					{task.date ? (
						<div
							className={cn(
								"flex row-span-2 text-left pl-5 pr-10 text_slate-900 text-sm",
								headingFont.className,
							)}
						>
							Deadline: {editDateFormat(task.date)}
						</div>
					) : null}

					<div
						className={cn(
							"flex row-span-2 text-left pl-5 pr-10 text_slate-900 text-sm",
							headingFont.className,
						)}
					>
						{/* Project: {project.text} */}
					</div>
				</div>
			</div>

			<div className="transition-all duration-50 opacity-0 group-hover:opacity-100 flex gap-2 p-4">
				<Modal projectId={task.projectId} isEditing={true} task={task} />
				<Button onClick={handleDeleteTodo}>
					<TrashIcon
						size={20}
						className="rounded-lg hover:bg-violet-300 text_slate-900 cursor-pointer"
					/>
				</Button>
			</div>
		</li>
	);
};
export default Task;
