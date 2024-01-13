"use server";
import { IProject } from "@/types/projects";
import { getUserId } from "./apiUser";
import { deleteTodo, editTodo, getAllTodos } from "./apiTasks";

const baseUrl = "http://localhost:3001";

export const getAllProjects = async (): Promise<IProject[]> => {
  const userId = await getUserId();
  const res = await fetch(`${baseUrl}/projects?userId=${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    console.log("Failed to get projects");
  }

  const todos = await res.json();

  return todos;
};

export const addProject = async (
  projectId: string,
  text: string
): Promise<IProject> => {
  const userId = await getUserId();
  const project: IProject = {
    id: projectId,
    text: text,
    userId: userId,
  };
  const res = await fetch(`${baseUrl}/projects`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(project),
  });
  if (!res.ok) {
    throw new Error("Failed to add project");
  }
  const newProject = await res.json();
  return newProject;
};

export const editProject = async (
  projectId: string,
  text: string,
  prevName: string
): Promise<void> => {
  const userId = await getUserId();
  const project: IProject = {
    id: projectId,
    text: text,
    userId: userId,
  };
  console.log(project);
  const tasks = await getAllTodos(prevName);
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    await editTodo(task.id, task.text, project.text, task.isDone);
  }
  const res = await fetch(`${baseUrl}/projects/${projectId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    console.log(res.status);
    throw new Error("Failed to edit project");
  }
};

export const deleteProject = async (
  projectId: string,
  prevName: string
): Promise<void> => {
  const tasks = await getAllTodos(prevName);
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    await deleteTodo(task.id);
  }
  const res = await fetch(`${baseUrl}/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!res.ok) {
    console.log(res.status);
    throw new Error("Failed to delete project");
  }
};
