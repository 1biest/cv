'use client';

import { useEffect, useState } from 'react';
import { useParseCommitCsv } from '../hooks/useParseCommitCsv';

type GithubStatsProps = {
  fetchUrl: string[];
  color: string;
  aggregateWeek: boolean;
};

export default function GithubStats({ fetchUrl, color, aggregateWeek }: GithubStatsProps) {
  const [csv, setCsv] = useState<string>('');

  useEffect(() => {
    const fetchCsvs = async () => {
      try {
        const csvDataArray = await Promise.all(
          fetchUrl.map(async (url) => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch ${url}`);
            return res.text();
          })
        );
        setCsv(csvDataArray.join('\n')); // Combine CSVs
      } catch (err) {
        console.error('Error loading CSVs:', err);
      }
    };

    if (fetchUrl.length) {
      fetchCsvs();
    }
  }, [fetchUrl]);

  const data = useParseCommitCsv(csv, aggregateWeek);

  return (
    <div className="grid grid-cols-7 gap-[2px] w-[82px]">
      {data.map(([timestamp, commitCount], i) => {
        const intensity = Math.min(commitCount * 3, 20);
        const opacity = [
          'opacity-0',
          'opacity-5',
          'opacity-10',
          'opacity-15',
          'opacity-20',
          'opacity-25',
          'opacity-30',
          'opacity-35',
          'opacity-40',
          'opacity-45',
          'opacity-50',
          'opacity-55',
          'opacity-60',
          'opacity-65',
          'opacity-70',
          'opacity-75',
          'opacity-80',
          'opacity-85',
          'opacity-90',
          'opacity-95',
          'opacity-100',
        ][intensity];

        return (
          <div
            key={i}
            className={`w-[10px] h-[10px] p-0 m-0 ${opacity} rounded-xs`}
            style={{ backgroundColor: color || '#39d353' }} // Inline style for background color
            title={`${commitCount} commit${commitCount > 1 ? 's' : ''} on ${new Date(timestamp * 1000).toLocaleDateString()}`}
          />
        );
      })}
    </div>
  );
}
