"use server";
import { ITask } from "../types/tasks";
import { auth } from "@clerk/nextjs";
const baseUrl = "http://localhost:3001";

export const getUserId = async (): Promise<string> => {
  const { userId } = auth();
  console.log(userId);
  if (!userId) {
    throw new Error("not logged in");
  }
  return userId;
};
export const getAllTodos = async (project: string): Promise<ITask[]> => {
  const userId = await getUserId();
  console.log(project);
  const res = await fetch(`${baseUrl}/tasks?userId=${userId}&projects=${project}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    console.log("Failed to get tasks");
  }

  const todos = await res.json();

  return todos;
};

export const addTodo = async (todoId: string, text: string, project: string): Promise<ITask> => {
  const userId = await getUserId();
  const todo: ITask = {
    id: todoId,
    text: text,
    userId: userId,
    project: project,
  };
  const res = await fetch(`${baseUrl}/tasks?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    throw new Error("Failed to add task");
  }
  const newTodo = await res.json();
  return newTodo;
};

export const deleteTodo = async(taskId: string): Promise<void> =>{
  const userId = await getUserId();
  const response = await fetch(`${baseUrl}/tasks/${taskId}?userId=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  console.log("Task deleted successfully");
}

export const editTodo = async(todoId: string, newTask: string): Promise<void> =>{
  const userId = await getUserId();
  const todo: ITask = {
    id: todoId,
    text: newTask,
    userId: userId,
    project: `today`,
  };
  const response = await fetch(`${baseUrl}/tasks/${todo.id}?userId=${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  console.log("Task updated successfully");
}
