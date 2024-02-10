"use client";
import { Button } from "@/components/ui/button";
import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import ModalTask from "./modalTask";
import { ProjectDropDown } from "./projectDropDown";
import React from "react";
import { IProject } from "@/types/projects";
import { SidebarCollapseIcon, SidebarExpandIcon } from "@primer/octicons-react";
const headingFont = Open_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});
interface SideBarProps {
	userId: string;
	projects: IProject[];
}
export const SideBar: React.FC<SideBarProps> = ({ projects, userId }) => {
	const [showSideBar, setShowSidebar] = React.useState(true);
	return (
		<>
			{showSideBar ? (
				<div className="w-64 shrink-0 h-screen bg-violet-100 pt-5 pl-2 shadow-lg">
					<div className="font-medium text-lg flex itmes-center mb-4 col-auto">
						<UserButton afterSignOutUrl="/" />
						<div className="flex items-center justify-between w-full ">
							<div
								className={cn(
									"ml-2 text-lg font-medium",
									headingFont.className,
								)}
							>
								Dashboard
							</div>
							<Button
								variant="outline"
								className={cn(
									" px-2 py-2 h-full w-auto rounded-lg text-m text_slate-900 hover:bg-violet-300 ",
									headingFont.className,
								)}
								onClick={() => setShowSidebar(false)}
							>
								<SidebarExpandIcon size={24} className="text_slate-900" />
							</Button>
						</div>
					</div>

					<div className="flex items-center justify-between w-full mr-2">
						<Button
							variant="outline"
							className={cn(
								"pl-2 block h-full w-full rounded-sm text-lg text_slate-900 hover:bg-violet-200 focus:bg-violet-300",
								headingFont.className,
							)}
							asChild
						>
							<Link href={"/dashboard/" + userId + "/inbox/"}>Inbox</Link>
						</Button>
						<ModalTask
							projectId={userId + "inbox"}
							isEditing={false}
							task={null}
						/>
					</div>
					<div className="flex items-center justify-between w-full mr-2">
						<Button
							variant="outline"
							className={cn(
								"pl-2 block h-full w-full rounded-sm text-lg text_slate-900 hover:bg-violet-200 focus:bg-violet-300",
								headingFont.className,
							)}
							asChild
						>
							<Link href={"/dashboard/" + userId + "/today/"}>Today</Link>
						</Button>
						<ModalTask
							projectId={userId + "inbox"}
							isEditing={false}
							task={null}
						/>
					</div>
					<ProjectDropDown projects={projects} userId={userId} />
				</div>
			) : (
				<div className="my-5 mx-2">
					<Button
						variant="outline"
						className={cn(
							" px-2 py-2 h-full w-auto rounded-lg text-m text_slate-900 hover:bg-violet-300 ",
							headingFont.className,
						)}
						onClick={() => setShowSidebar(true)}
					>
						<SidebarCollapseIcon size={24} className="text_slate-900" />
					</Button>
				</div>
			)}
		</>
	);
};
