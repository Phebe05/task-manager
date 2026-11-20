import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // Open or close the native dialog when the `open` prop changes
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="confirm-dialog"
      onCancel={(e) => {
        e.preventDefault(); // Escape key: let our state decide
        onCancel();
      }}
    >
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="dialog-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="button" className="danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}