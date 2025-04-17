'use client';

import { useEffect, useState } from 'react';
import { useParseCommitCsv } from '../hooks/useParseCommitCsv';

type GithubStatsProps = {
  fetchUrl: string;
  color: string;
};

export default function GithubStats({ fetchUrl, color }: GithubStatsProps) {
  const [csv, setCsv] = useState<string>('');

  useEffect(() => {
    const fetchCsv = async () => {
      try {
        const res = await fetch(fetchUrl);
        const text = await res.text();
        setCsv(text);
      } catch (err) {
        console.error('Error loading CSV:', err);
      }
    };

    fetchCsv();
  }, [fetchUrl]);

  const data = useParseCommitCsv(csv);

  return (
    <ul className="flex flex-col gap-[2px]">
      {data.map(([timestamp, commitCount], i) => {
        const intensity = Math.min(commitCount, 5);
        const opacity = [
          'opacity-0',
          'opacity-20',
          'opacity-40',
          'opacity-60',
          'opacity-80',
          'opacity-100',
        ][intensity];

        return (
          <li
            key={i}
            className={`w-[10px] h-[10px] ${opacity} rounded-xs`}
            style={{ backgroundColor: color || '#39d353' }} // Inline style for background color
            title={`${commitCount} commit${commitCount > 1 ? 's' : ''} on ${new Date(timestamp * 1000).toLocaleDateString()}`}
          />
        );
      })}
    </ul>
  );
}
