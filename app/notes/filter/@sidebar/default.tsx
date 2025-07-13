'use client';

import Link from 'next/link';
import { tags } from '../../../../constants/tags';
import css from './SideBarNotes.module.css';
import { usePathname } from 'next/navigation';

// interface SidebarNotesProps {
//   activeTag: string;
// }

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

// 'use client';

// import { tags } from '../../../../constants/tags';
// import css from './SideBarNotes.module.css';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const SidebarNotes = () => {
//   const path = usePathname().split('/');
//   const activeTag = path[path.length - 1];
//   console.log('Active Tag:', activeTag);

//   return (
//     <ul className={css.menuList}>
//       {tags.map(tag => {
//         const isActive = tag === activeTag;
//         return (
//           <li key={tag} className={css.menuItem}>
//             <Link
//               href={`/notes/filter/${tag}`}
//               className={`${css.menuLink} ${isActive ? css.active : ''} `}
//             >
//               {tag}
//             </Link>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default SidebarNotes;
