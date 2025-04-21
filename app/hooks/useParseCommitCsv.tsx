import { useEffect, useState } from 'react';

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export function useParseCommitCsv(csvText: string, aggregateByWeek: boolean = true) {
  const [data, setData] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!csvText) return;

    const cleanedCsvText = csvText.replace(/[^\x20-\x7E\n\r]/g, '').trim();
    const lines = cleanedCsvText.split('\n');

    const commitMap: Record<string, number> = {};
    let earliest: Date | null = null;
    let latest: Date | null = null;

    lines.forEach((line, idx) => {
      const [rawDate] = line.split(',');
      const dateStr = rawDate?.trim();
      if (!dateStr) return;

      const sanitizedDateStr = dateStr.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
      const date = new Date(sanitizedDateStr);
      if (isNaN(date.getTime())) {
        console.warn(`Skipping invalid date on line ${idx + 1}:`, sanitizedDateStr);
        return;
      }

      const keyDate = aggregateByWeek ? getWeekStart(date) : new Date(date);
      keyDate.setHours(0, 0, 0, 0);
      const key = keyDate.toISOString().split('T')[0];

      commitMap[key] = (commitMap[key] || 0) + 1;

      if (!earliest || date < earliest) earliest = date;
      if (!latest || date > latest) latest = date;
    });

    if (!earliest || !latest) return;

    const allPoints: [number, number][] = [];
    const current = aggregateByWeek ? getWeekStart(new Date()) : new Date();
    current.setHours(0, 0, 0, 0);
    const end = aggregateByWeek ? getWeekStart(earliest) : new Date(earliest);
    end.setHours(0, 0, 0, 0);

    while (current >= end) {
      const key = current.toISOString().split('T')[0];
      const timestamp = Math.floor(current.getTime() / 1000);
      const count = commitMap[key] || 0;
      allPoints.push([timestamp, count]);

      current.setDate(current.getDate() - (aggregateByWeek ? 7 : 1));
    }

    setData(allPoints);
  }, [csvText, aggregateByWeek]);

  return data;
}
