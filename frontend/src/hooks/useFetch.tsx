import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = <T,>(
  url: string,
  initialState: T
): [T, boolean, Error | undefined] => {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    setLoading(true);

    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err));
  }, [url]);

  useEffect(() => {
    setLoading(false);
  }, [data, error]);

  return [data, loading, error];
};

// 함수 호출
// interface dataModel {
//     id: number;
//     title: string;
//     completed: boolean;
// }

// const [data, loading, error] = useFetch<dataModel[]>('url string', []);
