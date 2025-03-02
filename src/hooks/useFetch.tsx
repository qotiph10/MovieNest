import { useState, useEffect } from "react";

const useFetch = <T,>(url: string): T | null => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [url]);

  return data;
};

export default useFetch;
