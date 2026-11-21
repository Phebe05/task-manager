// One function per backend endpoint. Components never call fetch directly.
import { request } from "./client";
import type { Task, TaskPatch, NewTask } from "../types/task";

export const getTasks = () => request<Task[]>("/api/tasks");

export const updateTask = (id: number, patch: TaskPatch) =>
  request<Task>(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });

export const createTask = (task: NewTask) =>
  request<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });

export const deleteTask = (id: number) =>
  request<void>(`/api/tasks/${id}`, {
    method: "DELETE",
  });

export const replaceTask = (id: number, task: NewTask) =>
    request<Task>(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
    });
