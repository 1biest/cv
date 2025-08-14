'use client';

import { useEffect, useState } from 'react';
import { useGithubStats } from '../hooks/useGithub';
import { usePathname } from 'next/navigation';

type Props = {
  owner: string;
  repo: string;
};

export default function GithubStatsClient({ owner, repo }: Props) {
  const { data } = useGithubStats(owner, repo);
  const [animate, setAnimate] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const pathname = usePathname();
  const DELAY_PER_INDEX_MS = 5;
  const TRANSITION_MS = 400;

  console.log('githubData', data);

  /* if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; */

  useEffect(() => {
    // Re-trigger fade-in on data updates and route changes with double-RAF to ensure initial paint at 0
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
  }, [data, pathname]);

  return (
    <ul key={pathname} className="flex flex-col gap-[2px]">
      {data?.map(([timestamp, additions, deletions], i) => {
        const intensity = Math.min(additions, 5);
        const targetOpacity = intensity === 0 ? 0 : Math.min(intensity * 0.2, 1);
        const baseGreyOpacity = targetOpacity * 0.25;
        const currentOpacity = animate ? targetOpacity : 0;

        return (
          <li
            key={i}
            className={`relative w-[10px] h-[10px] rounded-xs`}
            title={`+${additions}, -${Math.abs(deletions)} on ${new Date(timestamp * 1000).toLocaleDateString()}`}
          >
            <div
              className="absolute inset-0 rounded-xs"
              style={{ backgroundColor: '#99ACC7', opacity: baseGreyOpacity }}
            />
            <div
              key={`${animationKey}-${i}`}
              className="absolute inset-0 rounded-xs"
              style={{
                backgroundColor: '#39d353',
                opacity: currentOpacity,
                transition: `opacity ${TRANSITION_MS}ms ease-out`,
                transitionDelay: `${i * DELAY_PER_INDEX_MS}ms`,
                willChange: 'opacity',
                pointerEvents: 'none',
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}
