'use client'
import { IoTrashBinOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/app/(api)/apiProjects";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
interface DeleteButtonProps{
    projectId: string;
    projectName: string;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ projectId,projectName}) => {
    const router = useRouter();
    const handleDeleteProjButton: MouseEventHandler<HTMLButtonElement> = async (
        e
      ) => {
        e.preventDefault();
        router.push('/')
        await deleteProject(projectId, projectName);
        router.refresh();
      };
    return(<IoTrashBinOutline className = "rounded-lg hover:bg-violet-300 py-3 w-10 h-10" onClick={handleDeleteProjButton} />);

}

export default DeleteButton;