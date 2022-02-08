import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const { search } = useLocation();
  const query = useMemo(() => {
    const entries = Array.from(new URLSearchParams(search).entries());
    return entries.reduce((query, [key, val]) => {
      query[key] = val;
      return query;
    }, {} as any);
  }, [search]);
  return query;
};

export default useQuery;
