import { useCallback, useEffect, useState } from 'react';
import { getTasks, updateTask } from '../api/tasks';
import type { Task, TaskStatus } from '../types/task';

/** Loads tasks from the API and tracks loading and error state. */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTasks(await getTasks());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  /** Ticks a task as done, or sets it back to pending if it was already done. */
  const toggleDone = useCallback(async (task: Task) => {
    const status: TaskStatus = task.status === 'done' ? 'pending' : 'done';
    setActionError(null);
    try {
      const updated = await updateTask(task.id, { status });
      // Swap the changed task into the list using the server's response
      setTasks((current) => current.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not update the task');
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { tasks, loading, error, actionError, reload, toggleDone };
}