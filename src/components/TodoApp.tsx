import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { TaskStats } from "./TaskStats";
import { TaskFilters } from "./TaskFilters";
import { toast } from "sonner";

export function TodoApp() {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const tasks = useQuery(api.tasks.getTasks, { filter, search }) ?? [];
  const stats = useQuery(api.tasks.getTaskStats) ?? { total: 0, completed: 0, pending: 0 };
  
  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);
  const toggleTask = useMutation(api.tasks.toggleTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const handleCreateTask = async (taskData: {
    title: string;
    description?: string;
    dueDate?: number;
    priority: "low" | "medium" | "high";
  }) => {
    try {
      await createTask(taskData);
      setShowForm(false);
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Failed to create task");
      console.error(error);
    }
  };

  const handleUpdateTask = async (id: string, updates: {
    title?: string;
    description?: string;
    dueDate?: number;
    priority?: "low" | "medium" | "high";
  }) => {
    try {
      await updateTask({ id: id as any, ...updates });
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task");
      console.error(error);
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await toggleTask({ id: id as any });
      toast.success("Task status updated!");
    } catch (error) {
      toast.error("Failed to update task");
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ id: id as any });
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <TaskStats stats={stats} />

      {/* Filters and Search */}
      <TaskFilters
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
        onAddTask={() => setShowForm(true)}
      />

      {/* Task Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New Task</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <TaskForm onSubmit={handleCreateTask} />
        </div>
      )}

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500 mb-4">
            {search ? "Try adjusting your search or filters" : "Get started by creating your first task"}
          </p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Task
            </button>
          )}
        </div>
      )}
    </div>
  );
}
