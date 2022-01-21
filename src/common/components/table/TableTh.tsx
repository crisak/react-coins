import { DefaultProps } from "../../interfaces/DefaultProps";

export const TableTh = (props: DefaultProps) => {
  return <td className="table__th">{props.children}</td>;
};
