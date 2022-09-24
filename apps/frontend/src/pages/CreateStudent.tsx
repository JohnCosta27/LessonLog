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
    <div class="w-full flex flex-col gap-2">
      <h2 class="text-2xl">Create Student</h2>
      <input
        type="text"
        placeholder="Student name..."
        class="input input-secondary w-full"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <input
        type="date"
        placeholder="Joining date"
        class="input input-secondary w-full"
        onChange={(e) => setDate(new Date(e.currentTarget.value).getTime())}
      />
      <button
        class="btn btn-primary w-full"
        onClick={() => {
          mutate({
            variables: { name: name(), startDate: date() },
          });
        }}
      >
        Create Student
      </button>
    </div>
  );
};
