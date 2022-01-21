import { DefaultProps } from "../../interfaces/DefaultProps";

export const TableTd = (props: DefaultProps) => {
  return <td className="table__td">{props.children}</td>;
};
