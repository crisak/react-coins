import { HTMLAttributes } from "react";
import "./styles.scss";
import { DefaultProps } from "../../interfaces/DefaultProps";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {}

export const Paragraph = (props: DefaultProps<TextProps>) => {
  const { children, className = "", ...restProps } = props;
  return (
    <p {...restProps} className={`paragraph ${className}`}>
      {children}
    </p>
  );
};
