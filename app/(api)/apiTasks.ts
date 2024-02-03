"use server";
import { ITask } from "../../types/tasks";
import { getUserId } from "./apiUser";

import prisma from "@/lib/prisma";

export const getAllTodosPrisma = async (
	projectId: string,
	userId: string,
): Promise<ITask[]> => {
	const tasks = await prisma.task.findMany({
		where: {
			projectId: projectId,
			userId: userId,
		},
	});
	projectId, ": ", tasks;
	return tasks;
};
export const getAllTodaysTodosPrisma = async (userId: string) => {
	let now = new Date();
	let today = now.toUTCString().split(" ").slice(0, 4).join(" ");
	const tasks = await prisma.task.findMany({
		where: {
			userId: userId,
			date: today,
		},
	});
	return tasks;
};

export const addTodoPrisma = async (
	todoId: string,
	text: string,
	projectId: string,
	date: Date | null | String,
): Promise<ITask> => {
	projectId;
	const userId = await getUserId();
	const res = await prisma.task.create({
		data: {
			id: todoId,
			text: text,
			userId: userId,
			isDone: false,
			date: date?.toString(),
			projectId: projectId,
		},
	});
	const newTodo = await res;
	return newTodo;
};

export const deleteTodoPrisma = async (taskId: string): Promise<void> => {
	await prisma.task.delete({
		where: {
			id: taskId,
		},
	});
};

export const editTodoPrisma = async (
	todoId: string,
	newTask: string,
	project: string,
	isDone: boolean,
	date: Date | null | String,
): Promise<void> => {
	let dateP;
	if (date != null) {
		dateP = date.toString();
	} else {
		dateP = date;
	}

	await prisma.task.update({
		where: {
			id: todoId,
		},
		data: {
			text: newTask,
			isDone: isDone,
			date: dateP,
			projectId: project,
		},
	});
};
