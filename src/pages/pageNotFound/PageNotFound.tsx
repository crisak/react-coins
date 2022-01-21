import "./styles.scss";
import { Box } from "../../common/components";
import { Helmet } from "react-helmet";

export const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>Coin | Not found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div className="page-not-found">
        <Box inset="true"></Box>
      </div>
    </>
  );
};
