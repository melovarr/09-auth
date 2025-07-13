import axios from 'axios';
import type { NewNoteData, Note } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
if (!myKey) {
  throw new Error('TOKEN IS MISSING');
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

const axiosInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${myKey}`,
  },
});

export async function fetchNotes(
  query: string,
  page?: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const params: FetchNotesParams = {
    ...(query.trim() !== '' && { search: query.trim() }),
    page: page,
    perPage: 12,
    tag,
  };

  const response = await axiosInstance.get<FetchNotesResponse>('/notes', {
    params,
  });
  return response.data;
}

export async function createNote(newNote: NewNoteData): Promise<Note> {
  const response = await axiosInstance.post<Note>('/notes', newNote);
  return response.data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const response = await axiosInstance.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function fetchNoteById(noteId: number): Promise<Note> {
  const response = await axiosInstance.get<Note>(`/notes/${noteId}`);
  return response.data;
}
