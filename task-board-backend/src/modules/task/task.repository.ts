import prisma from "../../infrastructure/db/prisma";
import { CreateTaskDto, UpdateTaskDto } from "./task.types";

export class TaskRepository {
  async findAll() {
    return prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: CreateTaskDto) {
    return prisma.task.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.task.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: any) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.task.delete({
      where: { id },
    });
  }
}
