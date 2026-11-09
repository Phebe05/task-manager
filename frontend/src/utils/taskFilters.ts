import type { Task, TaskFilters, TaskSort } from '../types/task';

const PRIORITY_RANK = { high: 0, medium: 1, low: 2 } as const;
const NO_DATE = '9999-12-31'; // tasks without a due date sort last

function compare(a: Task, b: Task, sort: TaskSort): number {
  if (sort === 'priority') return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
  if (sort === 'created_at') return b.createdAt.localeCompare(a.createdAt);
  return (a.dueDate ?? NO_DATE).localeCompare(b.dueDate ?? NO_DATE);
}

/** Filters, searches and sorts in the browser (the backend returns everything). */
export function applyFilters(tasks: Task[], filters: TaskFilters): Task[] {
  const term = filters.search.trim().toLowerCase();
  return tasks
    .filter((t) => !filters.status || t.status === filters.status)
    .filter((t) => !term || t.title.toLowerCase().includes(term))
    .sort((a, b) => compare(a, b, filters.sort));
}
