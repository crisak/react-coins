import "./styles.scss";
import { ListOfCoins } from "./components/listOfCoins/ListOfCoins";
import { Filters } from "./components/filters/Filters";
import { Container } from "../../common/components/container/Container";
import { Title } from "../../common/components/title/Title";
import { Paragraph } from "../../common/components/paragraph/Paragraph";
import { Helmet } from "react-helmet";

export const PageCoins = () => {
  return (
    <>
      <Helmet>
        <title>Coin | list coins</title>
        <meta name="description" content="List of all coins" />
      </Helmet>
      <Container>
        <section className="page-coins">
          <div>
            <Title className="pb2 text-primary">Lista de monedas</Title>
            <Paragraph className="mb7">
              Precios de criptomonedas en vivo y límites de mercado de monedas
            </Paragraph>
            <Filters />
          </div>

          <ListOfCoins className="page-coins__list" />
        </section>
      </Container>
    </>
  );
};
