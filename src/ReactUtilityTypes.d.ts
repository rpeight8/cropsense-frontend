declare type ElementProps<T> = T extends React.ComponentType<infer Props>
  ? Props extends object
    ? Props
    : never
  : never;

declare type UnionFromArray<T extends any[]> = T[number];
