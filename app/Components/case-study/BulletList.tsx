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
    <ul className="space-y-4 my-6">
      {items.map((item, index) => {
        // Handle object format
        if (typeof item === 'object' && item !== null) {
          return (
            <li key={index} className="flex flex-col gap-1">
              <span className="text-white font-medium">{item.title}</span>
              <span className="text-gray-400">{item.description}</span>
            </li>
          );
        }

        // Handle simple string format
        return (
          <li key={index} className="flex items-center">
            <span className="text-gray-500 mr-3 shrink-0 select-none">✦</span>
            <span className="text-gray-300">{item as string}</span>
          </li>
        );
      })}
    </ul>
  );
};
