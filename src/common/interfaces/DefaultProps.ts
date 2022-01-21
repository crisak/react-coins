import { ReactChild, ReactFragment, ReactPortal } from "react";

type ChildrenElement =
  | boolean
  | ReactChild
  | ReactFragment
  | ReactPortal
  | null
  | undefined;

export type DefaultProps<props = {}> = { children?: ChildrenElement } & props;
