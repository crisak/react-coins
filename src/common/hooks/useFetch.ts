import { useCallback, useEffect, useState } from "react";

type RequestData<T> = () => Promise<T>;
type FilterResponse<T, Y> = (data: T) => any;
type TypeDataState<T, Y> = Y extends undefined ? T : Y;

export const useFetch = <T, Y = undefined>(
  requestDataProp: RequestData<T>,
  filterResponseProp?: FilterResponse<T, Y>
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TypeDataState<T, Y> | null>();
  const [error, setError] = useState<unknown>(null);

  const getCoins = useCallback(
    async (
      requestDataP: RequestData<T>,
      filterResponseP?: FilterResponse<T, Y>
    ) => {
      try {
        setError(null);
        setLoading(true);
        const dataRequest = await requestDataP();

        if (filterResponseP) {
          const filterData = filterResponseP(dataRequest);
          setData(filterData);
        } else {
          setData(dataRequest as any);
        }
      } catch (error) {
        console.error("useFetch.error: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getCoins(requestDataProp, filterResponseProp);
  }, []);

  return {
    loading,
    data,
    error,
    doRequest: getCoins
  };
};
