import { useEffect, useState } from "react";

export function useDebounce<T>(searchQuery: string, time: number): T {
  const [debounceQuery, setDebounceQuery] = useState<T>(searchQuery as unknown as T);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(searchQuery as unknown as T);
    }, time);

    return () => {
      clearTimeout(handler);
    };
  }, [time, searchQuery]);

  return debounceQuery;
}
