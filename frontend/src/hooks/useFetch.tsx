import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = <T,>(
  url: string,
  initialState: T,
  headers?: Record<string, string>,
  body?: any
): [T, boolean, Error | undefined] => {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    setLoading(true);

    const config = {
      headers: headers,
      data: body,
    };

    const fullUrl = "https://yumyumfriends.site" + url;

    axios
      .get(fullUrl, config)
      .then((res) => setData(res.data))
      .catch((err) => setError(err));
  }, [url]);

  useEffect(() => {
    setLoading(false);
  }, [data, error]);

  return [data, loading, error];
};
