export interface Action {
  type: string;
  [key: string]: any;
}

export type Reducer<S> = (state: S, action: Action) => S;
