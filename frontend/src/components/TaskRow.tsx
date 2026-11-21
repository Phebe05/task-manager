import { StatusChip } from "./StatusChip";
import { formatDueDate, isOverdue } from "../utils/date";
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import type {Task, TaskStatus} from "../types/task";

interface TaskRowProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
}

export function TaskRow({ task, onToggle, onDelete, onEdit, onStatusChange }: TaskRowProps) {
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

        <select
            className={`chip s-${task.status}`}
            value={task.status}
            aria-label={`Status of "${task.title}"`}
            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
        >
            <option value="pending">Pending</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
        </select>

     <div className="acts">
        <button type="button" onClick={()=> onEdit(task)}>Edit</button>
         <button type="button" className="danger" onClick={() => setConfirmOpen(true)}>
             Delete Task
         </button>
     </div>


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
