import "./styles.scss";
import { DefaultProps } from "../../interfaces/DefaultProps";

interface TableProps {
  className: string;
}

export const Table = (props: DefaultProps<TableProps>) => {
  const { children, ...restProps } = props;
  return (
    <table {...restProps} className={`table ${props.className}`}>
      {props.children}
    </table>
  );
};
