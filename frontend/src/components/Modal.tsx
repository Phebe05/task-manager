import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      onCancel={(e) => {
        e.preventDefault(); // Escape key
        onClose();
      }}
      onClick={(e) => {
        // A click on the dimmed area lands on the dialog itself,
        // while clicks inside the form land on its children.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-body">{children}</div>
    </dialog>
  );
}