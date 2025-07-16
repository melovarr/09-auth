'use client';

import Link from 'next/link';
import css from './SideBarNotes.module.css';
import { usePathname } from 'next/navigation';

export const tags: string[] = [
  'All',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
  'Todo',
];

const SidebarNotes = () => {
  const path = usePathname().split('/');
  const activeTag = path[path.length - 1];

  return (
    <ul className={css.menuList}>
      {tags.map(tag => {
        const isActive = tag === activeTag;
        return (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={`${css.menuLink} ${isActive ? css.active : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNotes;
