"use server";
import { ITask } from "../../types/tasks";
import { getUserId } from "./apiUser";
const baseUrl = "http://localhost:3001";

export const getAllTodos = async (project: string): Promise<ITask[]> => {
  const userId = await getUserId();
  const res = await fetch(
    `${baseUrl}/tasks?userId=${userId}&project=${project}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.log("Failed to get tasks");
  }

  const todos = await res.json();

  return todos;
};

export const addTodo = async (
  todoId: string,
  text: string,
  project: string
): Promise<ITask> => {
  const userId = await getUserId();
  const todo: ITask = {
    id: todoId,
    text: text,
    userId: userId,
    project: project,
    isDone: false
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

export const deleteTodo = async (taskId: string): Promise<void> => {
  const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  console.log("Task deleted successfully");
};

export const editTodo = async (
  todoId: string,
  newTask: string,
  project: string,
  isDone: boolean,
): Promise<void> => {
  const userId = await getUserId();
  const todo: ITask = {
    id: todoId,
    text: newTask,
    userId: userId,
    project: project,
    isDone: isDone
  };
  const response = await fetch(`${baseUrl}/tasks/${todo.id}`, {
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
};
