import { StatusChip } from './StatusChip';
import { formatDueDate, isOverdue } from '../utils/date';
import type { Task } from '../types/task';

interface TaskRowProps {
  task: Task;
  onToggle: (task: Task) => void;
}

export function TaskRow({ task, onToggle }: TaskRowProps) {
  const done = task.status === 'done';
  const overdue = isOverdue(task.dueDate, done);

  return (
    <li className={`task p-${task.priority}${done ? ' done' : ''}`}>
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
      <span className={`due${overdue ? ' overdue' : ''}`}>
        {formatDueDate(task.dueDate)}
        {overdue && ' (overdue)'}
      </span>
      <StatusChip status={task.status} />
    </li>
  );
}