import { TaskRepository } from "./task.repository";
import { CreateTaskDto, UpdateTaskDto } from "./task.types";
import { AppError } from "../../shared/utils/appError";
import { getIO } from "../../infrastructure/socket/socket";

const taskRepository = new TaskRepository();

export class TaskService {
  async getAllTasks() {
    return taskRepository.findAll();
  }

  async createTask(data: CreateTaskDto) {
    if (!data.title || data.title.trim() === "") {
      throw new AppError("Title is required", 400);
    }

    const task = await taskRepository.create({
      ...data,
      status: data.status || "TODO", // 🔥 default status
    });

    // 🔥 Emit real-time event
    getIO().emit("task:created", task);

    return task;
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    const existing = await taskRepository.findById(id);

    if (!existing) {
      throw new AppError("Task not found", 404);
    }

    // 🔥 Validate at least one field
    if (!data.title && !data.description && !data.status) {
      throw new AppError("No valid fields to update", 400);
    }

    // 🔥 Conflict handling
    if (data.updatedAt && new Date(data.updatedAt) < existing.updatedAt) {
      return existing;
    }

    const updatedTask = await taskRepository.update(id, {
      title: data.title,
      description: data.description,
      status: data.status,
    });

    // 🔥 Emit update event
    getIO().emit("task:updated", updatedTask);

    return updatedTask;
  }

  async deleteTask(id: string) {
    const existing = await taskRepository.findById(id);

    if (!existing) {
      throw new AppError("Task not found", 404);
    }

    await taskRepository.delete(id);

    // 🔥 Emit delete event
    getIO().emit("task:deleted", { id });

    return;
  }
}
