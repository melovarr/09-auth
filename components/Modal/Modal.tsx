'use client';
import { createPortal } from 'react-dom';
import css from './NoteModal.module.css';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NoteModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: NoteModalProps) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  useEffect(() => {
    const handleEscClick = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleEscClick);
    return () => document.removeEventListener('keydown', handleEscClick);
  }, [handleClose]);

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
