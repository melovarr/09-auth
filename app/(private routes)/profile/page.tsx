import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import css from './Profile.module.css';
import { getServerMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const { username, avatar } = await getServerMe();

  return {
    title: username,
    description: `profile of ${username}`,

    openGraph: {
      title: username,
      description: `profile of ${username}`,
      url: `https://09-auth-cyan.vercel.app/profile`,
      siteName: 'NoteHub',
      images: [
        {
          url: avatar || '/default-avatar.png',
          width: 1200,
          height: 630,
          alt: 'NoteHub App',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: username,
      description: `profile of ${username}`,
      images: [avatar || '/default-avatar.png'],
    },
  };
};

const Profile = async () => {
  const user = await getServerMe();
  if (!user) {
    console.log('Unauthorized user');
  }
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username || 'Guest'}</p>
          <p>Email: {user?.email || 'example@mail.com'}</p>
        </div>
      </div>
    </main>
  );
};
export default Profile;
