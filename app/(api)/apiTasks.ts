"use server";
import { ITask } from "../../types/tasks";
import { getUserId } from "./apiUser";

import prisma from "@/lib/prisma";

export const getAllTodosPrisma = async (project: string) => {
  const userId = await getUserId();
  const tasks = await prisma.task.findMany({
    where: {
      project: project,
      userId: userId,
    },
  });

  console.log("prisma tasks", tasks);

  return tasks;
};

export const addTodoPrisma = async (
  todoId: string,
  text: string,
  project: string,
  date: Date | null
): Promise<ITask> => {
  const userId = await getUserId();
  const res = await prisma.task.create({
    data: {
      id: todoId,
      text: text,
      userId: userId,
      project: project,
      isDone: false,
      date: date?.toString(),
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

  console.log("Task deleted successfully");
};

export const editTodoPrisma = async (
  todoId: string,
  newTask: string,
  project: string,
  isDone: boolean,
  date: Date | null
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
      project: project,
    },
  });

  console.log("Task updated in prisma successfully");
};
