'use client';

import { useEffect, useState } from 'react';
import { useParseCommitCsv } from '../hooks/useParseCommitCsv';
import { ThemeAccentColor } from '../config';

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

  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysUntilSunday = (6 - dayOfWeek) % 7;

  const paddedData = [...data];

  for (let i = 0; i < daysUntilSunday; i++) {
    paddedData.unshift([0, 0]);
  }

  const reversedWeeklyData = [];
  for (let i = 0; i < paddedData.length; i += 7) {
    const week = paddedData.slice(i, i + 7);
    reversedWeeklyData.push(...week.reverse());
  }

  return (
    <div className={`grid ${aggregateWeek ? 'grid-cols-1' : 'grid-cols-7'} gap-[2px] w-[82px]`}>
      {reversedWeeklyData.map(([timestamp, commitCount], i) => {
        const intensity = Math.min(commitCount * 4, 20);
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
          <div className="relative group" key={i}>
            <div
              className={`${aggregateWeek ? 'w-[82]' : 'w-[10px]'} h-[10px] p-0 m-0 ${opacity} rounded-xs`}
              style={{ backgroundColor: color || '#39d353' }}
            />
            {commitCount > 0 && (
              <div
                className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all bg-[#101322] text-[#dde5ed] text-xs px-2 py-1 rounded pointer-events-none z-50 whitespace-nowrap border border-[var(--theme-accent)]"
                style={{ '--theme-accent': ThemeAccentColor } as React.CSSProperties}
              >
                {`${commitCount} commit${commitCount > 1 ? 's' : ''} on ${timestamp ? new Date(timestamp * 1000).toISOString().slice(0, 10) : ''}`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
