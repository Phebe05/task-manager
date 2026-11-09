/** "2026-11-02" becomes "2 Nov". */
export function formatDueDate(dueDate: string | null): string {
  if (!dueDate) return '';
  return new Date(`${dueDate}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

/** True when the due date has passed and the task isn't done. */
export function isOverdue(dueDate: string | null, done: boolean): boolean {
  if (!dueDate || done) return false;
  const today = new Date().toLocaleDateString('en-CA'); // gives YYYY-MM-DD in local time
  return dueDate < today;
}
