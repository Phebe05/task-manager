import { STATUS_FILTERS } from '../constants/task';
import type { TaskStatus } from '../types/task';

interface SidebarProps {
  activeStatus: TaskStatus | '';
  onChange: (status: TaskStatus | '') => void;
}

export function Sidebar({ activeStatus, onChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h1>Tasks</h1>
      <nav className="filters" aria-label="Filter by status">
        {STATUS_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            className={value === activeStatus ? 'on' : ''}
            onClick={() => onChange(value)}
          >
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
