import { useState } from "react";
import { TaskItem } from "./TaskItem";

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: number;
  priority: "low" | "medium" | "high";
  _creationTime: number;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: {
    title?: string;
    description?: string;
    dueDate?: number;
    priority?: "low" | "medium" | "high";
  }) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onUpdate, onDelete }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = (id: string, updates: any) => {
    onUpdate(id, updates);
    setEditingId(null);
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          isEditing={editingId === task._id}
          onToggle={() => onToggle(task._id)}
          onEdit={() => handleEdit(task._id)}
          onCancelEdit={handleCancelEdit}
          onSaveEdit={(updates) => handleSaveEdit(task._id, updates)}
          onDelete={() => onDelete(task._id)}
        />
      ))}
    </div>
  );
}
