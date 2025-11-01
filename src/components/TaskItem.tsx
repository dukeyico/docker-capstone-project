import { useState } from "react";
import { TaskForm } from "./TaskForm";

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: number;
  priority: "low" | "medium" | "high";
  _creationTime: number;
}

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: (updates: {
    title?: string;
    description?: string;
    dueDate?: number;
    priority?: "low" | "medium" | "high";
  }) => void;
  onDelete: () => void;
}

export function TaskItem({
  task,
  isEditing,
  onToggle,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: TaskItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return "🔴";
      case "medium": return "🟡";
      case "low": return "🟢";
      default: return "⚪";
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const isOverdue = task.dueDate && task.dueDate < Date.now() && !task.completed;

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-gray-900">Edit Task</h4>
          <button
            onClick={onCancelEdit}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <TaskForm
          onSubmit={onSaveEdit}
          initialData={{
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
          }}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 transition-all ${
      task.completed ? "opacity-75" : ""
    } ${isOverdue ? "border-l-4 border-l-red-500" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-400"
          }`}
        >
          {task.completed && "✓"}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className={`font-medium ${
                task.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`mt-1 text-sm ${
                  task.completed ? "line-through text-gray-400" : "text-gray-600"
                }`}>
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-3 mt-2">
                {/* Priority */}
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                  {getPriorityIcon(task.priority)}
                  {task.priority}
                </span>

                {/* Due Date */}
                {task.dueDate && (
                  <span className={`text-xs ${
                    isOverdue ? "text-red-600 font-medium" : "text-gray-500"
                  }`}>
                    Due: {formatDate(task.dueDate)}
                    {isOverdue && " (Overdue)"}
                  </span>
                )}

                {/* Creation Date */}
                <span className="text-xs text-gray-400">
                  Created: {formatDate(task._creationTime)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onEdit}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit task"
              >
                ✏️
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-gray-400 hover:text-red-600 transition-colors"
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 mb-3">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onDelete();
                setShowDeleteConfirm(false);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
