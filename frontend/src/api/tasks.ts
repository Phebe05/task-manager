// One function per backend endpoint. Components never call fetch directly.
import { request } from './client';
import type { Task, TaskPatch } from '../types/task';

export const getTasks = () => request<Task[]>('/api/tasks');

export const updateTask = (id: number, patch: TaskPatch) =>
  request<Task>(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });