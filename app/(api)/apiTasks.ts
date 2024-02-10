"use server";
import dayjs from "dayjs";
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
	return tasks;
};
export const getAllTodaysTodosPrisma = async (userId: string) => {
	const now = dayjs().toString();
	const today = now.split(" ").slice(1, 4);
	const fin = today[0] + " " + today[1] + " " + today[2];
	const tasks = await prisma.task.findMany({
		where: {
			userId: userId,
			date: fin,
		},
	});
	return tasks;
};

export const addTodoPrisma = async (
	todoId: string,
	text: string,
	projectId: string,
	date: Date | null | string | undefined,
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
	date: Date | null | string | undefined,
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
