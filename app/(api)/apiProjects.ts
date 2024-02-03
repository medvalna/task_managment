"use server";
import { IProject } from "@/types/projects";
import { getUserId } from "./apiUser";
import prisma from "@/lib/prisma";
export const checkifExistsProjectsPrisma = async (
	projectId: string,
): Promise<boolean> => {
	const project = await prisma.project.findUnique({
		where: {
			id: projectId,
		},
	});
	if (project != null) return true;
	else return false;
};
export const getAllProjectsPrisma = async (userId: string) => {
	const projects = await prisma.project.findMany({
		where: {
			userId: userId,
			NOT: {
				text: { in: ["inbox", "today"] },
			},
		},
	});

	return projects;
};
export const getProjectById = async (projectId: string): Promise<IProject> => {
	const res = await prisma.project.findUnique({
		where: {
			id: projectId,
		},
	});

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
	project;

	await prisma.project.update({
		where: {
			id: projectId,
		},
		data: {
			text: text,
		},
	});
};

export const deleteProjectPrisma = async (projectId: string): Promise<void> => {
	await prisma.task.deleteMany({
		where: {
			projectId: projectId,
		},
	});
	await prisma.project.delete({
		where: {
			id: projectId,
		},
	});
};
