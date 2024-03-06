import { useEffect, useState } from "react";

const useQuery = (promise, dependency = []) => {
  const [data, setData] = useState();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, dependency);

  // nhận vào 1 query khác
  const fetchData = async (query) => {
    try {
      const res = await promise(query);
      setData(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("error :>> ", error);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, refetch: fetchData };
};

export default useQuery;
