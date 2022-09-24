import { Component, JSX } from 'solid-js';

export interface CardProps {
  title: string;
  search: string;
  setSearch: (arg0: string) => void;
  children: JSX.Element;
}

export const Card: Component<CardProps> = (props) => (
  <>
    <div class="w-full h-full rounded-md shadow-lg bg-neutral p-4 flex flex-col items-center">
      <h1 class="text-xl">{props.title}</h1>
      {props.children}
      <div class="w-full pt-2">
        <input
          class="w-full input input-primary"
          value={props.search}
          onChange={(e) => props.setSearch(e.currentTarget.value)}
        />
      </div>
    </div>
  </>
);
