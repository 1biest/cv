'use client';

import { useGithubStats } from '../hooks/useGithub';

type Props = {
  owner: string;
  repo: string;
};

export default function GithubStatsClient({ owner, repo }: Props) {
  const { data } = useGithubStats(owner, repo);

  console.log('githubData', data);

  /* if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; */

  return (
    <ul className="flex flex-col gap-[2px]">
      {data?.map(([timestamp, additions, deletions], i) => {
        const intensity = Math.min(additions, 5); // cap at 4 levels of intensity
        const color = [
          'bg-transparent opacity-0', // 0
          'bg-[#39d353] opacity-20', // 1
          'bg-[#39d353] opacity-40', // 1
          'bg-[#39d353] opacity-60', // 2
          'bg-[#39d353] opacity-80', // 3
          'bg-[#39d353] opacity-100', // 4
        ][intensity];

        return (
          <li
            key={i}
            className={`w-[10px] h-[10px] ${color} rounded-xs`}
            title={`+${additions}, -${Math.abs(deletions)} on ${new Date(timestamp * 1000).toLocaleDateString()}`}
          />
        );
      })}
    </ul>
  );
}
