import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../common/components";
import _ from "underscore";
import {
  Table,
  TableBody,
  TableHeader,
  TableTd,
  TableTh
} from "../../../../common/components/table";
import { useFetch } from "../../../../common/hooks/useFetch";
import {
  getAllCoins,
  ResponseApi
} from "../../../../common/services/coinlore/coinloreApi";
import { currencyFormat } from "../../../../common/utils";
import { pushCoins, saveCoins } from "../../../../state/crypto/coinsActions";
import { StoreFilters } from "../../../../state/crypto/coinsInterface";
import { ErrorMessage } from "../errorMessage/ErrorMessage";

const generateKey = ({ id, nameid }: { id: string; nameid: string }) => {
  return id + nameid || "key";
};

const initialPageData = {
  page: 1,
  totalList: 0,
  limit: 100
};

interface ListCoinsProps {
  className?: string;
}

export const ListOfCoins = (props: ListCoinsProps) => {
  const link = useNavigate();
  const dispatch = useDispatch();
  const [paginate, setPaginate] = useState(initialPageData);
  const containerTableRef = useRef<HTMLElement>(null);
  const {
    data: responseDataApi,
    loading: loadingCoins,
    error,
    doRequest
  } = useFetch<ResponseApi>(() => getAllCoins(1, paginate.limit) as any);

  const hasFilters: StoreFilters = useSelector(
    (store: any) => store.filters,
    _.isEqual
  );

  const coinsFiltered = useSelector(
    (store: any) => store.coinsFiltered as any[],
    _.isEqual
  );
  const coins = useSelector((store: any) => store.coins as any[]);

  const listCoins = hasFilters.hasFilters ? coinsFiltered : coins;

  const handleNavigate = (coinId: string) => {
    link(`/list-coins/${coinId}`);
  };

  const eventHandlerScrollInfinite = useCallback(() => {
    if (loadingCoins) {
      return;
    }
    setPaginate((prev) => ({
      ...prev,
      page: prev.page + 1
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCoins, hasFilters, loadingCoins]);

  const tryRequestFail = () => {
    doRequest(getAllCoins as any);
  };

  useEffect(() => {
    if (paginate.page > 1) {
      doRequest(() => getAllCoins(+paginate.page, paginate.limit) as any);
    }
  }, [paginate.page, doRequest, paginate.limit]);

  useEffect(() => {
    if (paginate.page === 1) {
      dispatch(saveCoins(responseDataApi?.data || []));
    } else {
      dispatch(pushCoins(responseDataApi?.data || []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataApi]);

  if (error && paginate.page === 1) {
    return (
      <div className="mb4">
        <ErrorMessage>
          <Button onClick={tryRequestFail}>Intentar de nuevo</Button>
        </ErrorMessage>
      </div>
    );
  }

  return (
    <>
      <section {...props} ref={containerTableRef}>
        <Table className="table--hover">
          <TableHeader>
            <tr className="table__tr">
              <TableTh>Rank</TableTh>
              <TableTh>Coin</TableTh>
              <TableTh>Price</TableTh>
              <TableTh>Market Cap</TableTh>
              <TableTh>24h Volume</TableTh>
            </tr>
          </TableHeader>
          <TableBody
            loading={loadingCoins}
            containerRef={containerTableRef}
            onActiveLastElement={() => eventHandlerScrollInfinite()}
          >
            {listCoins?.map((coin: any) => (
              <tr
                key={generateKey(coin)}
                className="table__tr"
                onClick={() => handleNavigate(coin.id)}
              >
                <TableTd>{coin.rank}</TableTd>
                <TableTd>
                  {coin.name} | {coin.symbol}
                </TableTd>
                <TableTd>{currencyFormat(+coin.price_usd)}</TableTd>
                <TableTd>{currencyFormat(+coin.market_cap_usd)}</TableTd>
                <TableTd>{currencyFormat(+coin.volume24)}</TableTd>
              </tr>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};
