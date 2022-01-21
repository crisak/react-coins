import "./styles.scss";
import { InputHTMLAttributes } from "react";
import { concatString } from "../../utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const createIdElement = (value: string = "") =>
  "input-" + value.toLowerCase().replace(/\s/g, "").trim();

export const Input = (props: InputProps) => {
  const { label, className = "", ...restProps } = props;

  const id = createIdElement(label);
  const classModifiers = concatString([...className.split(/\s/)]);

  return (
    <div className={`input-control ${classModifiers}`}>
      {!restProps.value && <label htmlFor={id}>{label || ""}</label>}
      <input id={id} {...restProps} title={label || ""} />
    </div>
  );
};
