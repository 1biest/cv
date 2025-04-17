import { useEffect, useState } from 'react';

export function useParseCommitCsv(csvText: string) {
  const [data, setData] = useState<[number, number][]>([]); // [timestamp, commitCount]

  useEffect(() => {
    if (!csvText) return;

    const lines = csvText.trim().split('\n');
    const dateMap: Record<string, number> = {};

    lines.forEach((line) => {
      const [dateStr] = line.split(',');
      dateMap[dateStr] = (dateMap[dateStr] || 0) + 1;
    });

    const parsedData = Object.entries(dateMap).map(([dateStr, count]) => {
      const timestamp = Math.floor(new Date(dateStr).getTime() / 1000);
      return [timestamp, count] as [number, number];
    });

    parsedData.sort((a, b) => a[0] - b[0]);
    setData(parsedData);
  }, [csvText]);

  return data;
}
