import { StatusChip } from "./StatusChip";
import { formatDueDate, isOverdue } from "../utils/date";
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import type { Task } from "../types/task";

interface TaskRowProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskRow({ task, onToggle, onDelete }: TaskRowProps) {
  const done = task.status === "done";
  const overdue = isOverdue(task.dueDate, done);

  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <li className={`task p-${task.priority}${done ? " done" : ""}`}>
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(task)}
        aria-label={`Mark "${task.title}" as done`}
      />
      <div className="body">
        <strong>{task.title}</strong>
        {task.description && <p>{task.description}</p>}
      </div>
      <span className={`due${overdue ? " overdue" : ""}`}>
        {formatDueDate(task.dueDate)}
        {overdue && " (overdue)"}
      </span>
      <StatusChip status={task.status} />

      <button
        type="button"
        className="danger"
        onClick={() => setConfirmOpen(true)}
      >
        Delete Task
      </button>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this task?"
        message={`"${task.title}" will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete(task.id);
        }}
      />
    </li>
  );
}
