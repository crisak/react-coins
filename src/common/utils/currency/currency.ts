export const currencyFormat = (number: number, options = { lang: "en-US" }) => {
  let value = number;
  if (isNaN(number) || typeof number !== "number") {
    value = 0;
  }

  const { lang, ...restOptions } = options;

  const langValue = lang || navigator.language;

  const optionDefault = {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    ...restOptions
  };

  return new Intl.NumberFormat(langValue, optionDefault).format(value);
};
