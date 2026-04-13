import { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask } from "../features/task/api"; // ✅ add updateTask
import { useTaskStore } from "../features/task/store";
import { TaskTable } from "../features/task/components/TaskTable";
import { AddTaskModal } from "../features/task/components/CreateTask";
import { ConfirmModal } from "../features/task/components/ConfirmModal";
import { socket } from "../socket/socket.ts";
import type { Task } from "../features/task/types";
import toast from "react-hot-toast";

export function TaskBoard() {
  const { tasks, setTasks } = useTaskStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    socket.on("task:created", fetchTasks);
    socket.on("task:updated", fetchTasks);
    socket.on("task:deleted", fetchTasks);

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
      console.error(error);
    }
  };

  const handleStatusChange = async (id: string, status: Task["status"]) => {
    try {
      await updateTask(id, {
        status,
        updatedAt: new Date().toISOString(),
      });

      toast.success("Status updated");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteTask(deleteId);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Task Management</h2>

        <button
          style={styles.addBtn}
          onClick={() => {
            setSelectedTask(null);
            setShowModal(true);
          }}
        >
          + Add Task
        </button>
      </div>

      {/*  TABLE (FIXED) */}
      <TaskTable
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <AddTaskModal
          task={selectedTask}
          onClose={handleCloseModal}
          onSuccess={fetchTasks}
        />
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this task?"
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "20px",
    background: "#f3f4f6",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  addBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
