"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import "flatpickr/dist/themes/airbnb.css";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addProjectPrisma } from "@/app/(api)/apiProjects";

const ModalProject = () => {
	const router = useRouter();
	const [showModal, setShowModal] = React.useState(false);
	const [newProject, setNewProject] = useState<string>("");

	const handleSubmitNewProject = async (project: string) => {
		await addProjectPrisma(uuidv4(), project);
		setShowModal(false);
		router.refresh();
		setNewProject("");
		setShowModal(false);
	};
	return (
		<React.Fragment>
			<Button
				variant="outline"
				className=" px-2 py-2 h-full w-auto rounded-lg text-m text_slate-900 hover:bg-violet-300 "
				onClick={() => setShowModal(true)}
			>
				<PlusIcon className="text-slate-900" size={20} />
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
						const project = formJson.project;
						setNewProject(project);
						handleSubmitNewProject(project);
					},
				}}
			>
				<div className="flex items-center pr-1 justify-between">
					<DialogTitle>Add Project</DialogTitle>
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
						name="project"
						label="Project"
						type="project"
						fullWidth
						variant="standard"
						value={newProject}
						onChange={(e) => setNewProject(e.target.value)}
					/>
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

export default ModalProject;
