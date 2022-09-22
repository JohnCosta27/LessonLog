import { Component, JSX } from "solid-js";

export interface ListProps {
  children: JSX.Element;
}

export const List: Component<ListProps> = (props) => (
  <div class="w-full h-full flex flex-col gap-4 rounded-md overflow-auto">
    {props.children}
  </div>
);
