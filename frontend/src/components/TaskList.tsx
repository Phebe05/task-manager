import { TaskRow } from './TaskRow';
import type { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggle: (task: Task) => void;
}

export function TaskList({ tasks, loading, error, onToggle }: TaskListProps) {
  if (error) {
    return <p className="status-message error" role="alert">Could not load tasks. {error}</p>;
  }
  if (loading) {
    return <p className="status-message" role="status">Loading tasks…</p>;
  }
  if (tasks.length === 0) {
    return <p className="status-message" role="status">No tasks here yet.</p>;
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}