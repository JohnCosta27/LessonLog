import { Component, createSignal } from "solid-js";
import { createMutation } from "@merged/solid-apollo";
import { studentMutation, studentQuery } from "../graphql";
import { MutationTypes, QueryTypes } from "@lessonlog/graphql-types";

export const CreateStudent: Component = () => {
  const [name, setName] = createSignal("");
  const [date, setDate] = createSignal(new Date().getTime());

  const [mutate] = createMutation<QueryTypes.Student, MutationTypes.Student>(
    studentMutation,
    {
      refetchQueries: [
        {
          query: studentQuery,
        },
      ],
    }
  );

  return (
    <div class="flex">
      <input
        type="text"
        placeholder="Type here"
        class="input input-secondary w-full max-w-xs"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <input
        type="date"
        placeholder="Joining date"
        class="input input-secondary w-full max-w-xs"
        onChange={(e) => setDate(new Date(e.currentTarget.value).getTime())}
      />
      <button
        class="btn btn-primary"
        onClick={() => {
          mutate({
            variables: { name: name(), startDate: date() },
          });
        }}
      >
        Create student
      </button>
    </div>
  );
};
