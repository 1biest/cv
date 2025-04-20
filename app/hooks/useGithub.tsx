'use client';

import { useEffect, useState } from 'react';

type WeeklyStats = [timestamp: number, additions: number, deletions: number];

interface UseRepoStatsResult {
  data: WeeklyStats[] | null;
  loading: boolean;
  error: string | null;
}

export function useGithubStats(owner: string, repo: string): UseRepoStatsResult {
  const [data, setData] = useState<WeeklyStats[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!owner || !repo) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/github/stats?owner=${owner}&repo=${repo}`);
        const json = await res.json();
        const reversedData = json.reverse();

        if (!res.ok) {
          throw new Error(json.error || 'Failed to fetch repo stats');
        }

        setData(reversedData);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [owner, repo]);

  return { data, loading, error };
}
