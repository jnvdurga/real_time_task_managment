import type { Task } from "../types";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

export function Column({ title, tasks, onRefresh }: ColumnProps) {
  return (
    <div style={styles.column}>
      <h3 style={styles.title}>{title}</h3>

      {tasks.length === 0 && <p style={styles.empty}>No tasks</p>}

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onRefresh={onRefresh} />
      ))}
    </div>
  );
}

const styles = {
  column: {
    flex: 1,
    background: "#f4f5f7",
    padding: "16px",
    borderRadius: "12px",
    minHeight: "400px",
  },
  title: {
    marginBottom: "12px",
  },
  empty: {
    color: "#888",
  },
};
