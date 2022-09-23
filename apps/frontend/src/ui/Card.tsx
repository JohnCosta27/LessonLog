import { Component, JSX } from "solid-js";

export interface CardProps {
  title: string;
  children: JSX.Element;
}

export const Card: Component<CardProps> = (props) => (
  <div class="w-full h-full rounded-md shadow-lg bg-neutral p-4 flex flex-col items-center">
    <h1 class="text-xl">{props.title}</h1>
    {props.children}
  </div>
);
