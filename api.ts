import { ITask } from "./types/tasks";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, {cache: 'no-store'});
  const todos = await res.json();
  return todos;
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};


export const deleteTodo = async(taskId: string): Promise<void> =>{
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
}

