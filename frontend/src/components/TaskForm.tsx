import { useState, type FormEvent } from 'react';
import type { NewTask, Task, TaskPriority, TaskStatus } from '../types/task';

interface TaskFormProps {
    initial?: Task; // present = editing, absent = creating
    onSubmit: (task: NewTask) => Promise<boolean>;
    onCancel: () => void;
}

export function TaskForm({ initial, onSubmit, onCancel }: TaskFormProps) {
    const editing = initial !== undefined;
    const [title, setTitle] = useState(initial?.title ?? '');
    const [description, setDescription] = useState(initial?.description ?? '');
    const [status, setStatus] = useState<TaskStatus>(initial?.status ?? 'pending');
    const [priority, setPriority] = useState<TaskPriority>(initial?.priority ?? 'medium');
    const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        setSaving(true);
        const ok = await onSubmit({
            title: title.trim(),
            description: description.trim() || null,
            status,
            priority,
            dueDate: dueDate || null,
        });
        setSaving(false);

        if (ok) {
            if (!editing) {
                setTitle('');
                setDescription('');
                setStatus('pending');
                setPriority('medium');
                setDueDate('');
            }
            onCancel();
        }
    }

    return (
        <form className="new-task-form" onSubmit={handleSubmit}>
            <h2>{editing ? 'Edit task' : 'New task'}</h2>
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
                aria-label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
                <option value="pending">Pending</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
            </select>
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
                    {saving ? 'Saving…' : editing ? 'Save changes' : 'Add task'}
                </button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}