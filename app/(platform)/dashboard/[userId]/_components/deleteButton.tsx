"use client";
import { deleteProjectPrisma } from "@/app/(api)/apiProjects";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@primer/octicons-react";
import { Button } from "@/components/ui/button";
interface DeleteButtonProps {
	projectId: string;
	projectName: string;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({
	projectId,
	projectName,
}) => {
	const router = useRouter();
	const handleDeleteProjButton: MouseEventHandler<HTMLButtonElement> = async (
		e,
	) => {
		e.preventDefault();
		router.push("/");
		await deleteProjectPrisma(projectId);
		router.refresh();
	};
	return (
		<Button
			variant="outline"
			className=" px-2 py-2 h-full w-auto rounded-lg text-m text_slate-900 hover:bg-violet-300 "
			onClick={handleDeleteProjButton}
		>
			<TrashIcon
				size={20}
				className="rounded-lg hover:bg-violet-300 text_slate-900"
			/>
		</Button>
	);
};

export default DeleteButton;
