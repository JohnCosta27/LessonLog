import { Component, JSX } from "solid-js";

export interface ListItemProps {
  children: JSX.Element;
}

export const ListItem: Component<ListItemProps> = (props) => (
  <div class="w-full h-full max-h-16 rounded-md px-2 py-1 transition-all hover:bg-base-100 hover:shadow-lg">
    <div class="w-full h-full flex flex-col justify-between">
      {props.children}
    </div>
  </div>
);
