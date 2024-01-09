"use server";
import { IProject } from "@/types/projects";
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

  export const addProject = async (projectId: string, text: string): Promise<IProject> => {
    const userId = await getUserId();
    const project: IProject = {
      id: projectId,
      text: text,
      userId: userId
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