"use client";
import { useEffect, useState } from "react";
import { Open_Sans } from "next/font/google";
import Modal from "../_components/modal";
import ModalProject from "../_components/modalProjects";
import DeleteButton from "../_components/deleteButton";
import { Input } from "@mui/material";
import { useRouter } from "next/navigation";
import { editProjectPrisma } from "@/app/(api)/apiProjects";
import { useDebounce } from "use-debounce";
interface DashboardTitleProps {
	projectId: string;
	projectName: string;
	userId: string;
}

const headingFont = Open_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});
const DashboardTitle: React.FC<DashboardTitleProps> = ({
	projectId,
	projectName,
	userId,
}) => {
	const router = useRouter();
	const [name, setName] = useState(projectName);
	const [debouncedValue] = useDebounce(name, 1000);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};
	useEffect(() => {
		const sendData = async () => {
			await editProjectPrisma(projectId, debouncedValue);
			router.push(
				`/dashboard/${userId}/project/${projectId}?name=${name}&id=${projectId}`,
			);
			router.refresh();
		};
		sendData();
	}, [debouncedValue]);

	return (
		<div className="w-full group flex ml-16 mr-40 group  transition-all duration-50 border-1 border-transparent hover:border-slate-700 hover:rounded-lg items-center justify-between">
			<div className="p-4 items-center ">
				<Input
					sx={{ width: 1, fontFamily: headingFont, fontSize: 24 }}
					defaultValue={projectName}
					onChange={handleInputChange}
				/>
			</div>

			<div className="transition-all duration-50 opacity-0 group-hover:opacity-100 flex">
				<Modal isEditing={false} task={null} projectId={projectId} />
				<DeleteButton projectId={projectId} projectName={projectName} />
			</div>
		</div>
	);
};

export default DashboardTitle;
