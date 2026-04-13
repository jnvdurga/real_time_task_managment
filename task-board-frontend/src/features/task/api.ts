import { api } from "../../services/api";
import type { Task } from "./types";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (data: {
  title: string;
  description?: string;
}) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
