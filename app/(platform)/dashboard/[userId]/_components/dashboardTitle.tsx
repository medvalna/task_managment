"use client";
import { useState } from "react";

interface DashboardTitleProps {
	projectId: string;
}
const DashboardTitle: React.FC<DashboardTitleProps> = ({ projectId }) => {
	const [isEditing, setisEditing] = useState(false);
	return <div>{projectId}</div>;
};

export default DashboardTitle;
