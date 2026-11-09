import { STATUS_LABELS } from '../constants/task';
import type { TaskStatus } from '../types/task';

interface StatusChipProps {
  status: TaskStatus;
}

export function StatusChip({ status }: StatusChipProps) {
  return <span className={`chip s-${status}`}>{STATUS_LABELS[status]}</span>;
}
