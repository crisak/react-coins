import { useState, ChangeEvent, useMemo } from "react";
import "./styles.scss";
import { Box, Title } from "../../../../common/components";
import { Input } from "../../../../common/components/input/Input";
import { currencyFormat } from "../../../../common/utils";

const initialState = {
  coin: "",
  amount: 1,
  toMoney: "USD",
  equivalent: ""
};

interface CalculatorProps {
  coin: string;
  amount: number;
  toMoney: string;
  equivalent: string;
}

export const Calculator = (props: Partial<CalculatorProps>) => {
  const { ...restProps } = props;
  const [formData, setFormData] = useState(() => {
    if (props.coin) {
      return restProps;
    }
    return initialState;
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (isNaN(Number(value))) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculate = useMemo(() => {
    const amount = +(formData.amount || 1);
    const equivalent = +(formData.equivalent || 0);

    return (amount || 0) * equivalent;
  }, [formData.amount, formData.equivalent]);

  return (
    <Box className="calculator">
      <div className="p4">
        <Title className="text-primary mb7">Calculadora</Title>
        <div className="flex">
          <div className="w30 mr4">
            <div className="mb2">
              <label>{`${props.toMoney || initialState.toMoney}`}</label>
            </div>

            <Input
              type="number"
              name="amount"
              label={`${props?.amount || "1"}`}
              onChange={onChange}
              value={formData?.amount}
            />
          </div>
          <div className="w70">
            <div className="mb2">
              <label>{`${props.coin}`}</label>
            </div>
            <Input
              name="equivalent"
              label={`${currencyFormat(+(props?.equivalent || 0))}`}
              disabled={true}
            />
          </div>
        </div>

        <div className="mt7 flex flex-justify-center">
          <div className="w40">
            <Box
              className="calculator__total"
              inset="true"
              aria-label="Total conversion"
            >
              {currencyFormat(+calculate)}
            </Box>
          </div>
        </div>
      </div>
    </Box>
  );
};
