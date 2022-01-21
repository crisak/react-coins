import React, { SelectHTMLAttributes } from "react";
import { concatString } from "../../utils";
import "./styles.scss";

interface InputProps extends SelectHTMLAttributes<HTMLElement> {
  items: { value: string; id: string }[];
}
export const Select = (props: InputProps) => {
  const { items, className = "", ...restProps } = props;

  const classNamesCustom = className.split(/\s/);

  const classModifiers = concatString(classNamesCustom);

  return (
    <select
      aria-label="Select"
      className={`select ${classModifiers}`}
      {...restProps}
    >
      {items.map(({ value, id }) => (
        <React.Fragment key={id}>
          <option value={id}>{value}</option>
        </React.Fragment>
      ))}
    </select>
  );
};
