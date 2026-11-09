export type TaskStatus = 'pending' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskSort = 'due_date' | 'priority' | 'created_at';
/** Any subset of the editable fields, as sent to PATCH /api/tasks/:id. */
export type TaskPatch = Partial<Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'dueDate'>>;

/** A task exactly as the Spring Boot API returns it. */
export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null; // "YYYY-MM-DD"
  createdAt: string;
  updatedAt: string;
}

/** What the user has chosen in the sidebar and toolbar. */
export interface TaskFilters {
  status: TaskStatus | ''; // '' means "all"
  search: string;
  sort: TaskSort;
}
