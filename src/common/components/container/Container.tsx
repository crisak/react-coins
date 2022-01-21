import "./styles.scss";
import { DefaultProps } from "../../interfaces/DefaultProps";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container = (props: DefaultProps<ContainerProps>) => {
  const { children, ...restProps } = props;
  return (
    <div {...restProps} className={`container ${props?.className || ""}`}>
      {children}
    </div>
  );
};
