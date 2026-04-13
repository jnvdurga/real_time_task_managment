import { useState, useEffect } from "react";
import { createTask, updateTask } from "../api";
import type { Task } from "../types";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  task?: Task;
}

export function AddTaskModal({ onClose, onSuccess, task }: Props) {
  const isEdit = !!task;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 Prefill when editing
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);

      if (isEdit) {
        await updateTask(task!.id, {
          title,
          description,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await createTask({
          title,
          description,
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>{isEdit ? "Edit Task" : "Add Task"}</h3>

        <input
          style={styles.input}
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div style={styles.actions}>
          <button onClick={onClose}>Cancel</button>

          <button onClick={handleSubmit}>
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update"
                : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
};
