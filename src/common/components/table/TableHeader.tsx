import { DefaultProps } from "../../interfaces/DefaultProps";

export const TableHeader = (props: DefaultProps) => {
  return <thead className="table__header">{props.children}</thead>;
};
