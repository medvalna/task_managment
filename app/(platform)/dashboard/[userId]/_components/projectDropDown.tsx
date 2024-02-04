"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IProject } from "@/types/projects";
import { useState } from "react";
import { Open_Sans } from "next/font/google";
import ModalProject from "./modalProjects";
import ProjectList from "./projectList";
import { IoMdArrowDropdown } from "react-icons/io";
import { ChevronDownIcon, ChevronUpIcon } from "@primer/octicons-react";
const headingFont = Open_Sans({
	subsets: ["latin"],
	weight: ["400"],
});

interface ProjectDropDownProps {
	projects: IProject[];
	userId: string;
}

export const ProjectDropDown: React.FC<ProjectDropDownProps> = ({
	projects,
	userId,
}) => {
	const [isOpen, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(!isOpen);
	};

	return (
		<>
			<div className="flex items-center justify-between w-full mr-2">
				<Button
					variant="outline"
					className={cn(
						" pl-2 block h-full w-full rounded-sm text-lg text_slate-900 hover:bg-violet-200 focus:bg-violet-300",
						headingFont.className,
					)}
					onClick={handleOpen}
				>
					<div className="flex justify-between w-full text_slate-900">
						Project
						{isOpen ? (
							<span className="hover:text-violet-700">
								<ChevronUpIcon className="w-5 h-5 mt-1 mr-2" />
							</span>
						) : (
							<span className="hover:text-violet-700">
								<ChevronDownIcon className="w-5 h-5 mt-1 mr-2" />
							</span>
						)}
					</div>
				</Button>

				<ModalProject isEditing={false} projectName="" projectId="" userId="" />
			</div>
			{isOpen && (
				<div
					className={cn(
						"flex items-center space-x-4 md:w-auto justify-between w-full",
						headingFont.className,
					)}
				>
					<ProjectList projects={projects} userId={userId} />
				</div>
			)}
		</>
	);
};
