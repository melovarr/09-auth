import { nextServer } from './api';
import type { Note, NewNoteData } from '../../types/note';
import { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
  sortBy?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthUserData {
  username: string;
  email: string;
}

export async function fetchNotes(
  query: string,
  page: number,
  tag: string | undefined = undefined
): Promise<FetchNotesResponse> {
  const params: FetchNotesParams = {
    ...(query.trim() !== '' && { search: query.trim() }),
    page: page,
    perPage: 12,
    tag,
  };

  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
  });
  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function checkSession(): Promise<boolean> {
  try {
    await nextServer.get('/auth/session');
    return true;
  } catch {
    return false;
  }
}

export const getMe = async () => {
  const responce = await nextServer.get<User>('/users/me');
  return responce.data;
};

export async function createNote(newNote: NewNoteData): Promise<Note> {
  const response = await nextServer.post<Note>('/notes', newNote);
  return response.data;
}

export async function register(
  userData: RegisterRequest
): Promise<AuthUserData> {
  const response = await nextServer.post<AuthUserData>(
    '/auth/register',
    userData
  );

  return response.data;
}

export async function login(userData: RegisterRequest): Promise<User> {
  const response = await nextServer.post<User>('/auth/login', userData);

  return response.data;
}

export async function logout() {
  await nextServer.post('/auth/logout');
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export const editUser = async (user: AuthUserData): Promise<User> => {
  const responce = await nextServer.patch<User>('/users/me', user);
  return responce.data;
};
