import { DefaultProps } from "../../interfaces/DefaultProps";
import "./styles.scss";

export const Layout = (props: DefaultProps) => (
  <div className="layout">{props.children}</div>
);
