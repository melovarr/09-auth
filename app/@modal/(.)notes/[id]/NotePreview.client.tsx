'use client';

import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/app/loading';
import NoteError from '../../../notes/[id]/error';
import Modal from '@/components/Modal/Modal';

type NotePreviewClientProps = { id: string | number };

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
  const router = useRouter();
  // Converting of ID to number, if nessesary
  const numericId = typeof id === 'string' ? Number(id) : id;

  const {
    data: note,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', numericId],
    queryFn: () => fetchNoteById(numericId),
    enabled: !!id,
    refetchOnMount: false,
  });

  const handleCloseModal = () => {
    router.back();
  };

  if (isLoading) return <Loader />;

  if (isError) return <NoteError error={error} />;

  if (!note) return <p>Note not found</p>;

  const date = new Date(note.createdAt);
  const formatetDate = date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Modal onClose={handleCloseModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            {note.tag && <span className={css.tag}>{note.tag}</span>}
            <button className={css.editBtn}>Edit note</button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formatetDate}</p>
        </div>
        <button className={css.editBtn} onClick={handleCloseModal}>
          GoBack
        </button>
      </div>
    </Modal>
  );
};
export default NotePreviewClient;
