import { useEffect, useState, useMemo } from "react";

export const useFetch = <T = unknown,>(
  url: string,
  initialState: T,
  options?: RequestInit
) => {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const memoizedOptions = useMemo(() => options, [options]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { ...memoizedOptions, signal });
        if (!response.ok) {
          const error = `Error ${response.status}: ${response.statusText}`;
          throw new Error(error || "Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (signal.aborted) return;
        setError(error as Error);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, memoizedOptions]);

  return { data, loading, error };
};
