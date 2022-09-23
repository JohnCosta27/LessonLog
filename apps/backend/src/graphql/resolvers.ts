import { MutationTypes, QueryTypes } from "@lessonlog/graphql-types";
import { prisma } from "../prisma";

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
      const lessons = await prisma.lessons.findMany({
        include: {
          student: {
            select: {
              name: true,
            }
          }
        }
      }).catch((e) => {
        console.log(e);
        return [];
      });
      console.log(lessons);
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
      { studentId, date, price, summary }: MutationTypes.Lesson
    ): Promise<QueryTypes.Lesson | undefined> {
      try {
        const newLesson = await prisma.lessons.create({
          data: {
            studentId: studentId,
            date: new Date(date),
            price: price,
            summary: summary,
          },
        });
        return {
          id: newLesson.id,
          studentId: newLesson.studentId,
          date: newLesson.date,
          price: newLesson.price,
          summary: newLesson.summary!,
        };
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
  },
};
