import { fetchNoteById } from '@/lib/api/clientApi';
import NoteDetailsClient from './NoteDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

const url = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const { title, content } = await fetchNoteById(id as string);
  const snippet = content.length > 30 ? content.slice(0, 30) + '...' : content;

  return {
    title: title || 'Note details',
    description: snippet,

    openGraph: {
      title: title || 'Note details',
      description: snippet,
      url: `https://08-zustand-psi.vercel.app/filter/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url,
          width: 1200,
          height: 630,
          alt: 'NoteHub App',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Note details',
      description: snippet,
      images: [url],
    },
  };
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id as string),
  });

  return (
    <div>
      <h1>NoteDetails</h1>
      <br />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </div>
  );
};

export default NoteDetails;
