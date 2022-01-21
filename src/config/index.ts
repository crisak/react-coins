import configDev from "./env/development";
import configProd from "./env/production";

export const CONFIG =
  process.env.NODE_ENV === "production" ? configProd : configDev;
