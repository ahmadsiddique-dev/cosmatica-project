import { useState, useCallback } from "react";

export function useApi<TData, TArgs = void>(
  fetcher: (args: TArgs) => Promise<TData>
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (args: TArgs) => {
      try {
        setLoading(true);
        setError(null);
        setData(null);
        
        const result = await fetcher(args);
        setData(result);
        return result;
      } catch (err: any) {
        const message = err.response?.data?.message || err.message || "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  return { data, loading, error, execute };
}