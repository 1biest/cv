'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParseCommitCsv } from '../hooks/useParseCommitCsv';
import { ThemeAccentColor } from '../config';

type GithubStatsProps = {
  fetchUrl: string[];
  color: string;
  aggregateWeek: boolean;
  isActive?: boolean;
  activeKey?: number;
};

export default function GithubStats({
  fetchUrl,
  color,
  aggregateWeek,
  isActive = false,
  activeKey = 0,
}: GithubStatsProps) {
  const [csv, setCsv] = useState<string>('');
  const [animate, setAnimate] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const fetchKey = useMemo(
    () => (fetchUrl && fetchUrl.length ? fetchUrl.join('|') : ''),
    [fetchUrl]
  );
  const DELAY_PER_INDEX_MS = 0.5;
  const TRANSITION_MS = 200;
  const BASE_GREY_ALPHA = 0.25;

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

  useEffect(() => {
    // Trigger animation only for active portfolio panel; ensure initial paint at 0
    if (!isActive) {
      setAnimate(false);
      return;
    }
    let raf1 = 0 as number | ReturnType<typeof requestAnimationFrame>;
    let raf2 = 0 as number | ReturnType<typeof requestAnimationFrame>;
    setAnimate(false);
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setAnimate(true));
    });
    setAnimationKey((k) => k + 1);
    return () => {
      cancelAnimationFrame(raf1 as number);
      cancelAnimationFrame(raf2 as number);
    };
  }, [isActive, activeKey, csv, aggregateWeek, fetchKey]);

  const data = useParseCommitCsv(csv, aggregateWeek);

  const reversedWeeklyData = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSunday = (6 - dayOfWeek) % 7;

    const padded = [...data];
    for (let i = 0; i < daysUntilSunday; i++) {
      padded.unshift([0, 0]);
    }

    const reversed: Array<[number, number]> = [];
    for (let i = 0; i < padded.length; i += 7) {
      const week = padded.slice(i, i + 7);
      reversed.push(...week.reverse());
    }
    return reversed;
  }, [data]);

  return (
    <div className={`grid ${aggregateWeek ? 'grid-cols-1' : 'grid-cols-7'} gap-[2px] w-[82px]`}>
      {reversedWeeklyData.map(([timestamp, commitCount], i) => {
        const intensity = Math.min(commitCount * 4, 20);
        const targetOpacity = intensity * 0.05; // 0..1
        const currentOpacity = isActive && animate ? targetOpacity : 0;

        return (
          <div className="relative group" key={`${animationKey}-${i}`}>
            <div
              className={`${aggregateWeek ? 'w-[82]' : 'w-[10px]'} h-[10px] p-0 m-0 rounded-xs`}
              style={{ backgroundColor: '#99ACC7', opacity: targetOpacity * BASE_GREY_ALPHA }}
            />
            <div
              className="absolute inset-0 rounded-xs"
              style={{
                backgroundColor: color || '#39d353',
                opacity: currentOpacity,
                transition: `opacity ${TRANSITION_MS}ms ease-out`,
                transitionDelay: `${i * DELAY_PER_INDEX_MS}ms`,
                willChange: 'opacity',
                pointerEvents: 'none',
              }}
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
