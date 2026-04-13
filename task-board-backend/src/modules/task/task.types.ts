export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface CreateTaskDto {
  title: string;
  description?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  updatedAt: string; // important for conflict handling
}
