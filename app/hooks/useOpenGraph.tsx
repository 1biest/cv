import { useEffect, useState, useRef } from 'react';

const APIKEY = process.env.NEXT_PUBLIC_LINK_PREVIEW_API_KEY;

type LinkPreviewData = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export function useLinkPreviews(links: string[]) {
  const [data, setData] = useState<(LinkPreviewData | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const prevLinksRef = useRef<string[]>([]);

  useEffect(() => {
    if (JSON.stringify(links) === JSON.stringify(prevLinksRef.current)) {
      return;
    }

    prevLinksRef.current = links;

    if (!links.length) {
      setData([]);
      return;
    }

    if (!APIKEY) {
      console.warn('Missing LINK_PREVIEW_API_KEY');
      setError(new Error('Missing API key'));
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          links.map(async (link) => {
            const res = await fetch(
              `https://api.linkpreview.net/?key=${APIKEY}&q=${encodeURIComponent(link)}`
            );
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            return res.json();
          })
        );

        setData(results);
      } catch (err) {
        setError(err as Error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [links]); // Only run when `links` actually change

  return { data, loading, error };
}
