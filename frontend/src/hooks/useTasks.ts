import { useCallback, useEffect, useState } from 'react';
import { createTask, deleteTask, getTasks, updateTask, replaceTask } from '../api/tasks';
import type { Task, TaskStatus, NewTask } from '../types/task';


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

  // Creates a task. Returns true on success so a form knows when to close.
  const addTask = useCallback(async (task:NewTask) => {
    setActionError(null);
    try {
      const created = await createTask(task);
      setTasks((current) => [...current, created]);
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not create the task');
    return false;
    }
  }, []);

  // Deletes a task and removes it from the list. 
  const removeTask = useCallback(async (id:number) => {
    setActionError(null);
    try {
      await deleteTask(id);
      setTasks((current) => current.filter((t) => t.id !== id));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not delete the task');
    }
    
  }, []);

  const editTask = useCallback(async (id: number, task: NewTask) => {
    setActionError(null);
    try {
      const updated = await replaceTask(id, task);
      setTasks((current) => current.map((t) => (t.id === updated.id ? updated : t)));
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not update the task');
      return false;
    }
  }, []);

  const changeStatus = useCallback(async (id: number, status: TaskStatus) => {
    setActionError(null);
    try {
      const updated = await updateTask(id, { status });
      setTasks((current) => current.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not update the status');
    }
  }, []);

  
  return { tasks, loading, error, actionError, removeTask, addTask, editTask, reload, toggleDone, changeStatus };
}