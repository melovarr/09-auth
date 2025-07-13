'use client';

import { useId, useState } from 'react';
import css from './NoteForm.module.css';
// import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { NewNoteData, Tag } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

// interface NoteFormProps {
//   onClose: () => void;
// }

// const initialFormValues: NewNoteData = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

const NoteForm = () => {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [alert, setAlert] = useState<{ [key: string]: string }>({});

  const onClose = () => router.push('/notes/filter/All');

  //HandleChange-------------------------------------------

  const handleChange = async (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    const updatedDraft = {
      ...draft,
      [name]: value,
    };
    setDraft(updatedDraft);

    validationSchema
      .validateAt(name, updatedDraft)
      .then(() => setAlert(prev => ({ ...prev, [name]: '' })))
      .catch(err => setAlert(prev => ({ ...prev, [name]: err.message })));
  };

  //ValidationSchema-------------------------------------------

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title can't be empty")
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title is too long'),

    content: Yup.string().max(500, 'Note is too long'),

    tag: Yup.string()
      .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
      .required('Tag is required'),
  });

  //Post notes func-------------------------------------------

  const { mutate } = useMutation({
    mutationFn: (values: NewNoteData) => createNote(values),
    onSuccess: () => {
      onClose();
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  //HandleSubmit-------------------------------------------

  const handleSubmit = async (formData: FormData) => {
    const values: NewNoteData = {
      title: (formData.get('title') as string) || '',
      content: (formData.get('content') as string) || '',
      tag: formData.get('tag') as Tag,
    };

    mutate(values);
  };

  //Button disabled logic-------------------------------------------

  const isFormValid =
    draft.title.trim().length >= 3 &&
    draft.title.trim().length <= 50 &&
    draft.content.trim().length <= 500;

  return (
    <form action={handleSubmit} className={css.form}>
      {/* -----Title input field----- */}

      <div className={css.formGroup}>
        <label className={css.formLabel} htmlFor={`${fieldId}-title`}>
          Title
        </label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          value={draft.title}
        />
        {alert.title && <div className={css.error}>{alert.title}</div>}
      </div>

      {/* -----Content textarea field----- */}

      <div className={css.formGroup}>
        <label className={css.formLabel} htmlFor={`${fieldId}-content`}>
          Content
        </label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          value={draft.content}
        />
        {alert.content && <div className={css.error}>{alert.content}</div>}
      </div>

      {/* -----Select tag field----- */}

      <div className={css.formGroup}>
        <label className={css.formLabel} htmlFor={`${fieldId}-tag`}>
          Tag
        </label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          onChange={handleChange}
          value={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {/* -----Action buttons----- */}

      <div>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={!isFormValid}
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
