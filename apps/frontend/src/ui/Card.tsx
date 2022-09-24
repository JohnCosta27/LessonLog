import { Component, JSX, Show } from 'solid-js';

type CardSearchableProps = {
  searchable: true;
  title: string;
  search: string;
  setSearch: (arg0: string) => void;
  children: JSX.Element;
};

export type CardProps =
  | {
      searchable: false;
      title: string;
      children: JSX.Element;
    }
  | CardSearchableProps;

// Have to cast because TS doesn't know that the Show component
// already implements the typechecking logic.
export const Card: Component<CardProps> = (props) => (
  <>
    <div class="w-full h-full rounded-md shadow-lg bg-neutral p-4 flex flex-col items-center">
      <h1 class="text-xl">{props.title}</h1>
      {props.children}
      <Show when={props.searchable}>
        <div class="w-full pt-2">
          <input
            class="w-full input input-primary"
            onInput={(e) => {
              console.log('On input change!');
              (props as CardSearchableProps).setSearch(e.currentTarget.value);
            }}
          />
        </div>
      </Show>
    </div>
  </>
);
