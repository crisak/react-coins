import { HTMLAttributes } from "react";
import { DefaultProps } from "../../interfaces/DefaultProps";
import "./styles.scss";

interface TitleProps extends HTMLAttributes<HTMLHRElement> {}

export const Title = (props: DefaultProps<TitleProps>) => {
  const { children, className = "", ...restProps } = props;
  return (
    <h2 {...restProps} className={`${className} title`}>
      {children}
    </h2>
  );
};
