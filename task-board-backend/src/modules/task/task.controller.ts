import { Request, Response } from "express";
import { TaskService } from "./task.service";

const taskService = new TaskService();

export class TaskController {
  async getTasks(req: Request, res: Response) {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  }

  async createTask(req: Request, res: Response) {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  }

  async updateTask(req: Request, res: Response, next: any) {
    try {
      const { id } = req.params;
      const task = await taskService.updateTask(id, req.body);
      res.json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error); // 🔥 pass to middleware
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    await taskService.deleteTask(id);
    res.status(204).send();
  }
}
