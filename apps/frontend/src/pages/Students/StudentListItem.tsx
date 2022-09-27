import { QueryTypes } from '@lessonlog/graphql-types';
import { Component, createEffect, createSignal } from 'solid-js';

export interface StudentListItemProps {
  name: string;
  startDate: Date;
  lessons: QueryTypes.Lesson[];
  hourBanks: QueryTypes.HourBank[];
}

export const StudentListItem: Component<StudentListItemProps> = (props) => {
  const { name, startDate, lessons, hourBanks } = props;

  const hoursCalculation = () =>
    hourBanks.reduce(
      (prev, current) => prev + current.hoursLeft,
      -lessons.length
    );

  const [availableHours, setAvailableHours] = createSignal(hoursCalculation());

  createEffect(() => {
    setAvailableHours(hoursCalculation());
  })

  return (
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <p class="text-xl">{name}</p>
        <p class="text-accent text-xs">
          {startDate.toISOString().slice(0, 10)}
        </p>
      </div>
      <div class="flex flex-col align-bottom">
        <p>Available Hours: {availableHours()}</p>
      </div>
    </div>
  );
};
