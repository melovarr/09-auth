'use client';

import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { tags } from '../../constants/tags';

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className={css.menuButton}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
