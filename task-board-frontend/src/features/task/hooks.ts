import { useEffect, useState } from "react";
import { getTasks } from "./api";
import type { Task } from "./types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      console.log("API DATA 👉", data); // 👈 ADD THIS
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };
  return { tasks, setTasks };
}
