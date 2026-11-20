import { useState, type FormEvent } from "react";
import type { NewTask, TaskPriority } from "../types/task";

interface NewTaskFormProps {
  onSubmit: (task: NewTask) => Promise<boolean>;
  onCancel: () => void;
}

export function NewTaskForm({ onSubmit, onCancel }: NewTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); // stop the browser from reloading the page
    if (!title.trim()) return;

    setSaving(true);
    const ok = await onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      priority,
      dueDate: dueDate || null,
    });
    setSaving(false);

    if (ok) {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      onCancel();
    } // close the form only if the task was created
  }

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        aria-label="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        required
      />
      <textarea
        placeholder="Description (optional)"
        aria-label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        aria-label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        aria-label="Due date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Add task"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
