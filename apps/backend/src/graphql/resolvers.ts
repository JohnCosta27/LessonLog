import { MutationTypes, QueryTypes } from '@lessonlog/graphql-types';
import { prisma } from '../prisma';

export const resolvers = {
  Query: {
    async students(): Promise<Array<QueryTypes.Student>> {
      try {
        const students = await prisma.students.findMany({
          include: {
            lessons: true,
          },
        });
        return students;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    async lessons(): Promise<Array<QueryTypes.Lesson>> {
      const lessons = await prisma.lessons
        .findMany({
          include: {
            student: {
              select: {
                name: true,
              },
            },
          },
        })
        .catch((e) => {
          console.log(e);
          return [];
        });
      return lessons;
    },
  },
  Mutation: {
    async addStudent(
      _: unknown,
      { name, startDate }: MutationTypes.Student
    ): Promise<{ name: string; startDate: Date } | undefined> {
      try {
        const newStudent = await prisma.students.create({
          data: {
            name: name,
            startDate: new Date(startDate),
          },
        });
        return newStudent;
      } catch (e) {
        return undefined;
      }
    },
    async addLesson(
      _: unknown,
      { studentId, date, price, paid, summary }: MutationTypes.Lesson
    ): Promise<QueryTypes.Lesson | undefined> {
      try {
        const newLesson = await prisma.lessons.create({
          data: {
            studentId: studentId,
            date: new Date(date),
            price: price,
            paid: !!paid,
            summary: summary,
          },
        });
        return newLesson;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    async updateLesson(
      _: unknown,
      {lessonId, ...data}: MutationTypes.UpdateLesson
    ): Promise<QueryTypes.Lesson | undefined> {
      const updateLesson = await prisma.lessons
        .update({
          where: {
            id: lessonId,
          },
          data: {
            ...data,
            date: data.date ? new Date(data.date) : undefined,
          },
        })
        .catch((e) => {
          console.log(e);
          return undefined;
        });
      return updateLesson;
    },
  },
};
