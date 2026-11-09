import type { TaskSort, TaskStatus } from '../types/task';

export const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'Pending',
  in_progress: 'In progress',
  done: 'Done',
};

export const STATUS_FILTERS: { value: TaskStatus | ''; label: string }[] = [
  { value: '', label: 'All tasks' },
  { value: 'pending', label: STATUS_LABELS.pending },
  { value: 'in_progress', label: STATUS_LABELS.in_progress },
  { value: 'done', label: STATUS_LABELS.done },
];

export const SORT_OPTIONS: { value: TaskSort; label: string }[] = [
  { value: 'due_date', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
  { value: 'created_at', label: 'Newest' },
];
