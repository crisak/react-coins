import "./styles.scss";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Title,
  Paragraph,
  Divider,
  PlaceHolderLoading
} from "../../common/components";
import { useFetch } from "../../common/hooks/useFetch";
import { getDetail } from "../../common/services/coinlore/coinloreApi";
import { MdOutlineLocalGasStation } from "react-icons/md";
import {
  AiTwotoneCrown,
  AiOutlineBarChart,
  AiOutlineLineChart
} from "react-icons/ai";
import { IoPricetagOutline } from "react-icons/io5";
import { Calculator } from "./components/calculator/Calculator";
import { Coin } from "../../common/services/coinlore/Coin";
import { currencyFormat } from "../../common/utils";
import { Helmet } from "react-helmet";

const filterRequestData = (data: Coin[]) => data[0];

export const PageCoinDetail = () => {
  const { coinId } = useParams();
  const {
    data: coinDetail,
    loading,
    error
  } = useFetch<Array<Coin>, Coin>(
    () => getDetail(coinId || ""),
    filterRequestData
  );

  const HelmetHeader = (
    <Helmet>
      <title>Coin | {coinDetail?.nameid || "loading ..."}</title>
      <meta name="description" content={`Detail coin ${coinDetail?.nameid}`} />
    </Helmet>
  );

  if (loading) {
    return (
      <>
        {HelmetHeader}
        <Container className="page-coin-detail">
          <section className="page-coin-detail__content cw">
            <Title>
              <div className="mt3 mb4">&nbsp;</div>
            </Title>
            <div className="mt3 mb4">&nbsp;</div>
            <PlaceHolderLoading style={{ height: 392 }} />
          </section>
          <aside className="page-coin-detail__aside cw">
            <div className="mb5">
              <PlaceHolderLoading style={{ height: 90 }} />
            </div>
            <div className="mb5">
              <PlaceHolderLoading style={{ height: 213 }} />
            </div>
            <PlaceHolderLoading style={{ height: 220 }} />
          </aside>
        </Container>
      </>
    );
  }

  if (error) {
    return <Paragraph>Se ha presentado un error: {error}</Paragraph>;
  }

  if (!coinDetail || !coinDetail?.id) {
    return (
      <Paragraph>
        La información no se pudo cargar recarga he intentalo de nuevo
      </Paragraph>
    );
  }

  const hasTextLong = coinDetail.rank.toString().length > 2;

  return (
    <>
      {HelmetHeader}
      <Container className="page-coin-detail">
        <section className="page-coin-detail__content cw">
          <Title>
            Convertidor BTC a USD{" "}
            <span className="text-primary">(United States Dollar)</span> -
            criptomoneda
          </Title>
          <div className="mt3 mb4">&nbsp;</div>
          {coinDetail.price_usd && (
            <Calculator
              coin={`${coinDetail.symbol} ${coinDetail.name}`}
              amount={1}
              equivalent={coinDetail.price_usd}
            />
          )}
        </section>
        <aside className="page-coin-detail__aside cw">
          <div className="box-rank">
            <div className={`rank ${hasTextLong ? "rank-text-long" : ""}`}>
              <AiTwotoneCrown />
              <span>{coinDetail.rank}</span>
            </div>
            <Box className="mb5 txt-center">
              <Title className="mb1">{coinDetail.name}</Title>
              <Paragraph>({coinDetail.symbol})</Paragraph>
            </Box>
          </div>

          <Box className="mb5">
            <div>
              <Title className="mb3">
                {currencyFormat(+coinDetail.price_usd)}
                <span className="title__sub-content ml1">USD</span>
              </Title>
              <Divider />
              <div className="mt4">
                <div className="mb2">
                  <label className="mr3">1h</label>
                  {coinDetail.percent_change_1h}%
                </div>
                <div className="mb2">
                  <label className="mr3">24h</label>
                  {coinDetail.percent_change_24h}%
                </div>
                <div className="mb2">
                  <label className="mr3">Week</label>
                  {coinDetail.percent_change_7d}%
                </div>
              </div>
            </div>
          </Box>

          <Box className="detail-coin">
            <div className="mb2">
              <label className="mb1">
                <AiOutlineBarChart /> Market cap
              </label>
              <Paragraph className="price-main">
                {currencyFormat(+coinDetail.market_cap_usd)}
              </Paragraph>
              <Paragraph className="price-secund">
                {currencyFormat(+coinDetail.csupply)} {coinDetail.symbol}
              </Paragraph>
            </div>
            <div className="mb2">
              <label className="mb1">
                <AiOutlineLineChart /> Vol (24H)
              </label>
              <Paragraph className="price-main">
                {currencyFormat(+coinDetail.volume24)}
              </Paragraph>
              <Paragraph className="price-secund">
                {currencyFormat(+coinDetail.volume24_native)}{" "}
                {coinDetail.symbol}
              </Paragraph>
            </div>
            <div className="mb2">
              <label className="mb1">
                <MdOutlineLocalGasStation /> Circulating Supply
              </label>
              <Paragraph className="price-main">
                {currencyFormat(+coinDetail.tsupply)}
              </Paragraph>
            </div>
            <div className="mb2">
              <label className="mb1">
                <IoPricetagOutline /> Total Supply
              </label>
              <Paragraph className="price-main">
                {currencyFormat(+coinDetail.tsupply)}
              </Paragraph>
              {coinDetail.msupply && (
                <Paragraph className="price-secund">
                  MAX {coinDetail.msupply}
                </Paragraph>
              )}
            </div>
          </Box>
        </aside>
      </Container>
    </>
  );
};
