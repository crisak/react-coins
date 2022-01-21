import "./styles.scss";
import { HTMLAttributes } from "react";
import { DefaultProps } from "../../interfaces/DefaultProps";
import { concatString } from "../../utils";

const colors = {
  primary: "button--color-primary",
  secondary: "button--color-secondary"
};

const sizes = {
  full: "button--full",
  auto: ""
};

const typeButton = {
  text: "button--text",
  auto: ""
};

interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, "color"> {
  size?: keyof typeof sizes;
  icon?: JSX.Element;
  iconDirection?: "start" | "end";
  type?: keyof typeof typeButton;
  color?: keyof typeof colors;
}

export const Button = (props: DefaultProps<ButtonProps>) => {
  const {
    color = "secondary",
    children,
    icon,
    type = "auto",
    size = "auto",
    iconDirection = "start",
    className = "",
    ...restProps
  } = props;
  const typeButtonClassName = typeButton[type] || "";

  const exitsIcon = Boolean(icon);
  const isIconEnd = iconDirection === "end";

  let marginRight = "";
  if (exitsIcon) {
    marginRight = "ml1";
    if (isIconEnd) {
      marginRight = "mr1";
    }
  }

  const classIconAlign = marginRight ? "button--icon" : "";
  const classColor = colors[color];
  const sizeClassName = sizes[size];
  const classNamesCustom = className.split(/\s/);

  const classModifiers = concatString([
    classColor,
    classIconAlign,
    typeButtonClassName,
    sizeClassName,
    ...classNamesCustom
  ]);

  return (
    <button {...restProps} className={`button ${classModifiers}`}>
      {!isIconEnd && exitsIcon ? icon : null}
      <span className={marginRight}>{children}</span>
      {isIconEnd && exitsIcon ? icon : null}
    </button>
  );
};
