import { HTMLAttributes } from "react";
import "./styles.scss";

export const PlaceHolderLoading = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className = "" } = props;
  return <div {...props} className={`place-holder-loading ${className}`}></div>;
};
