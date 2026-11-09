import { SORT_OPTIONS } from '../constants/task';
import type { TaskSort } from '../types/task';

interface ToolbarProps {
  search: string;
  sort: TaskSort;
  onSearchChange: (value: string) => void;
  onSortChange: (value: TaskSort) => void;
}

export function Toolbar({ search, sort, onSearchChange, onSortChange }: ToolbarProps) {
  return (
    <div className="toolbar">
      <input
        type="search"
        placeholder="Search by title"
        aria-label="Search tasks"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        aria-label="Sort tasks"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as TaskSort)}
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {/* The "New task" button arrives in step 4 */}
    </div>
  );
}
