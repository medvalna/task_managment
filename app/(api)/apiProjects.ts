"use server";
import { IProject } from "@/types/projects";
import { getUserId } from "./apiUser";
import prisma from "@/lib/prisma";
export const getAllProjectsPrisma = async (userId: string) => {
	const projects = await prisma.project.findMany({
		where: {
			userId: userId,
		},
	});

	return projects;
};

	return res;
};
export const addProjectPrisma = async (
	projectId: string,
	text: string,
): Promise<IProject> => {
	const userId = await getUserId();
	const res = await prisma.project.create({
		data: {
			id: projectId,
			text: text,
			userId: userId,
		},
	});
	const newProject = await res;
	return newProject;
};

export const editProjectPrisma = async (
	projectId: string,
	text: string,
	prevName: string,
): Promise<void> => {
	const userId = await getUserId();
	const project: IProject = {
		id: projectId,
		text: text,
		userId: userId,
	};
	console.log(project);
	await prisma.task.updateMany({
		where: {
			project: prevName,
		},
		data: {
			project: text,
		},
	});

	await prisma.project.update({
		where: {
			id: projectId,
		},
		data: {
			text: text,
		},
	});
};

export const deleteProjectPrisma = async (
	projectId: string,
	projName: string,
): Promise<void> => {
	await prisma.task.deleteMany({
		where: {
			project: projName,
		},
	});
	await prisma.project.delete({
		where: {
			id: projectId,
		},
	});
};
