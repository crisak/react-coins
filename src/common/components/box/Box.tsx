import { HTMLAttributes } from "react";
import { DefaultProps } from "../../interfaces/DefaultProps";
import "./styles.scss";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  inset?: string;
}

export const Box = (props: DefaultProps<BoxProps>) => {
  const { children, className, ...restProps } = props;
  const shadowInset = props?.inset ? " box--inset " : "";
  const className_ = className ? ` ${className} ` : "";
  return (
    <div {...restProps} className={`box${shadowInset}${className_}`}>
      {children}
    </div>
  );
};
