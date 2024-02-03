"use client";
import { cn } from "@/lib/utils";
import { ITask } from "@/types/tasks";
import { Open_Sans } from "next/font/google";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import React, { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { deleteTodoPrisma, editTodoPrisma } from "@/app/(api)/apiTasks";
import "flatpickr/dist/themes/material_green.css";
import Modal from "./modal";
import { getProjectById } from "@/app/(api)/apiProjects";
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

	const handleDeleteTodo: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		await deleteTodoPrisma(task.id);

		router.refresh();
	};
	const handleDoneTodo: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

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
		<li key={task.id} className="flex mb-4">
			<div className="flex w-3/4">
				{task.isDone ? (
					<MdCheckBox
						className="text_slate-900"
						cursor="pointer"
						size={25}
						onClick={handleDoneTodo}
					/>
				) : (
					<MdCheckBoxOutlineBlank
						className="text_slate-900"
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

			<div className="flex w-1/4 gap-2">
				<Modal projectId={task.projectId} isEditing={true} task={task} />
				<FaRegTrashAlt
					className="text_slate-900"
					cursor="pointer"
					size={25}
					onClick={handleDeleteTodo}
				/>
			</div>
		</li>
	);
};
export default Task;
