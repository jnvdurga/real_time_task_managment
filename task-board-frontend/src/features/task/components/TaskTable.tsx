import type { Task, TaskStatus } from "../types";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskTable({ tasks, onEdit, onDelete, onStatusChange }: Props) {
  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>

              <td>
                <select
                  value={task.status}
                  onChange={(e) =>
                    onStatusChange(task.id, e.target.value as TaskStatus)
                  }
                  style={styles.select}
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </td>

              <td>{new Date(task.createdAt).toLocaleString()}</td>

              <td>
                <button style={styles.editBtn} onClick={() => onEdit(task)}>
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  select: {
    padding: "6px",
    borderRadius: "6px",
  },
  editBtn: {
    marginRight: "6px",
    background: "#0ea5e9",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
