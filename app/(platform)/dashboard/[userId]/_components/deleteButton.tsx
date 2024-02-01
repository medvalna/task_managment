"use client";
import { deleteProjectPrisma } from "@/app/(api)/apiProjects";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
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
		await deleteProjectPrisma(projectId, projectName);
		router.refresh();
	};
	return (
		<FaRegTrashAlt
			className="rounded-lg hover:bg-violet-300 text-violet-950 py-3 w-10 h-10"
			onClick={handleDeleteProjButton}
		/>
	);
};

export default DeleteButton;
