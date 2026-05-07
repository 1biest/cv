import React from 'react';

interface BulletItem {
  title?: string;
  description: string;
}

interface BulletListProps {
  items: BulletItem[] | string[];
}

export const BulletList: React.FC<BulletListProps> = ({ items }) => {
  return (
    <ul className="my-6 space-y-4">
      {items.map((item, index) => {
        if (typeof item === 'object' && item !== null) {
          return (
            <li key={index} className="flex flex-col gap-1">
              <span className="font-medium text-[var(--text)]">{item.title}</span>
              <span className="text-[var(--text-muted)]">{item.description}</span>
            </li>
          );
        }

        return (
          <li key={index} className="flex items-center">
            <span className="mr-3 shrink-0 select-none text-[var(--text-muted)]">✦</span>
            <span className="text-[var(--text-muted)]">{item as string}</span>
          </li>
        );
      })}
    </ul>
  );
};
