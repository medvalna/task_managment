"use client";
import React, { MouseEventHandler, useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, XIcon } from "@primer/octicons-react";
import { addTodoPrisma, editTodoPrisma } from "@/app/(api)/apiTasks";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import dayjs, { Dayjs } from "dayjs";
import "flatpickr/dist/themes/airbnb.css";
import { ITask } from "@/types/tasks";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface NewModalProps {
	projectId: string;
	isEditing: boolean;
	task: ITask | null;
}

const NewModal: React.FC<NewModalProps> = ({ projectId, isEditing, task }) => {
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
		task ? dayjs(task.date) : dayjs(""),
	);
	const [showModal, setShowModal] = React.useState(false);
	const [newTask, setnewTask] = useState<string>(task ? task.text : "");

	/**
	 * function for adding 2 days to date
	 * I'm adding +2 days to saved date because for some reason
	 * date picker saving actual data with -2 days
	 */

	const dataFormatting = (data: string) => {
		const line = new Date(data);
		const newDate = new Date(line.getTime() + 2 * 24 * 60 * 60 * 1000);
		const formattedDate = newDate
			.toUTCString()
			.split(" ")
			.slice(0, 4)
			.join(" ");
		return formattedDate;
	};

	/**
	 * Adding Task with tapping Enter
	 */
	const handleSubmitNewTodo = async (todo: string) => {
		const data = selectedDate && dayjs(selectedDate);
		let form = data?.toString().split(" ").slice(1, 4).join(" ");
		await addTodoPrisma(
			uuidv4(),
			todo,
			projectId,
			dataFormatting(form!).split(" ").slice(1, 4).join(" "),
		);
		setnewTask("");
		router.refresh();
	};

	/**
	 * Editing task with tapping Enter
	 */
	const handleSubmitEditTodo = async (todo: string) => {
		const data = selectedDate && dayjs(selectedDate);
		let form = data?.toString().split(" ").slice(1, 4).join(" ");

		if (task)
			await editTodoPrisma(
				task.id,
				todo,
				task.projectId,
				task.isDone,
				dataFormatting(form!).split(" ").slice(1, 4).join(" "),
			);
		setShowModal(false);
		router.refresh();
	};

	/**
	 * Clearing date with pressing cross
	 */
	const handleClearDate: MouseEventHandler<HTMLButtonElement> = async (e) => {
		e.preventDefault();
		setSelectedDate(dayjs(""));
		if (task)
			await editTodoPrisma(
				task.id,
				newTask,
				task.projectId,
				task.isDone,
				selectedDate?.toString(),
			);

		router.refresh();
	};
	return (
		<React.Fragment>
			<Button
				variant="outline"
				className=" px-2 py-2 h-full w-auto rounded-lg text-m text_slate-900 hover:bg-violet-300 "
				onClick={() => setShowModal(true)}
			>
				{isEditing ? (
					<PencilIcon
						size={20}
						className="rounded-lg hover:bg-violet-300 text_slate-900"
					/>
				) : (
					<PlusIcon className="text-slate-900" size={20} />
				)}
			</Button>

			<Dialog
				open={showModal}
				onClose={() => setShowModal(false)}
				fullWidth
				PaperProps={{
					component: "form",
					onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const formJson = Object.fromEntries((formData as any).entries());
						const task = formJson.task;
						setnewTask(task);
						setShowModal(false);
						{
							isEditing
								? handleSubmitEditTodo(task)
								: handleSubmitNewTodo(task);
						}
					},
				}}
			>
				<div className="flex items-center pr-1 justify-between">
					<DialogTitle>{isEditing ? "Edit Task" : "Add Task"}</DialogTitle>
					<Button
						onClick={() => setShowModal(false)}
						variant="outline"
						className=" px-2 py-2 h-full w-auto rounded-lg text-m text-slate-900 hover:text-red-600 "
					>
						<XIcon size={20} />
					</Button>
				</div>
				<DialogContent>
					<DialogContentText></DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="task"
						label="Task"
						type="task"
						fullWidth
						variant="standard"
						value={newTask}
						onChange={(e) => setnewTask(e.target.value)}
					/>
					<div className="flex itms-center-y justify-between px-1 ">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker
									label="Basic date picker"
									value={task ? dayjs(selectedDate) : dayjs("")}
									onChange={(date) => setSelectedDate(date)}
								/>
							</DemoContainer>
						</LocalizationProvider>
						<Button
							onClick={handleClearDate}
							variant="outline"
							className=" px-2 py-2 h-full w-auto rounded-lg text-m text-slate-900 hover:text-red-600 "
						>
							<XIcon size={20} />
						</Button>
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setShowModal(false)}
						variant="outline"
						className="transition-all duration-100 px-2 py-2 h-full w-auto rounded-lg text-m text-slate-900 hover:text-red-600 "
					>
						Cancel
					</Button>
					<Button
						type="submit"
						onClick={() => setShowModal(false)}
						variant="outline"
						className=" transition-all duration-100 px-2 py-2 h-full w-auto rounded-lg text-m text-slate-900 hover:text-green-600 "
					>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default NewModal;
