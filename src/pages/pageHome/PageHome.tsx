import "./styles.scss";
import ImageBitcoin from "../../assets/img/bitcoin-dollar.jpeg";
import {
  Box,
  Button,
  Container,
  Paragraph,
  Title
} from "../../common/components";
import { GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export const PageHome = () => {
  const link = useNavigate();

  const handleClick = () => {
    link(`/list-coins`);
  };

  return (
    <>
      <Helmet>
        <title>Coin | Home</title>
        <meta name="description" content="Welcome app coins" />
      </Helmet>
      <Container className="page-home txt-center">
        <Box className="w70 p7">
          <Title className=" text-primary mb6">Pruaba WELO</Title>
          <Paragraph className="mb7">
            Obten las cripto-moneda en dólares (USD)
          </Paragraph>
          <div className="container-image mb7">
            <img src={ImageBitcoin} alt="bitcoin dollar" />
          </div>
          <div className="flex flex-justify-center">
            <Button icon={<GrNext />} iconDirection="end" onClick={handleClick}>
              Continuar
            </Button>
          </div>
        </Box>
      </Container>
    </>
  );
};
