import { QueryTypes } from "@lessonlog/graphql-types";
import { Component } from "solid-js";

export const Student: Component<QueryTypes.Student> = (props) => {
  return (
    <div class="w-full h-full max-h-16 rounded-md px-2 py-1 bg-primary transition-all hover:bg-base-100 hover:shadow-lg">
      <div class="w-full h-full flex flex-col justify-between">
        <p>{props.name}</p>
        <p class="text-accent text-xs">{new Date(props.startDate).toISOString().slice(0, 10)}</p>
      </div>
    </div>
  )
}
