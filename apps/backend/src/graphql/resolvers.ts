import { MutationTypes, QueryTypes } from '@lessonlog/graphql-types';
import { prisma } from '../prisma';

export const resolvers = {
  Query: {
    async students(): Promise<Array<QueryTypes.Student>> {
      try {
        const students = await prisma.students.findMany({
          include: {
            lessons: true,
            hourBanks: true,
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
    //TODO: Better error handling.
    // Return error message instead of undefined.
    async updateLesson(
      _: unknown,
      { lessonId, ...data }: MutationTypes.UpdateLesson
    ): Promise<QueryTypes.Lesson | undefined> {
      try {
        // TODO: Seperate this hour bank logic into it's own place.
        // If the user updates the paid, we should
        // 1) Check and deduct their hour from a lesson bank
        // 2) Create a 1 off lesson bank for 1 lesson
        // The above might not be ideal, but it will be the easiest
        // for the user to interact with.
        if (data.paid !== undefined) {
          const totalBanks = await prisma.lessons.findUniqueOrThrow({
            where: {
              id: lessonId,
            },
            select: {
              student: {
                select: {
                  id: true,
                  hourBanks: {
                    where: {
                      hoursLeft: {
                        gt: 0,
                      },
                    },
                  },
                },
              },
            },
          });
          // Create a one of lesson bank;
          if (totalBanks.student.hourBanks.length === 0) {
            const oneoffBank = await prisma.hourBanks.create({
              data: {
                studentId: totalBanks.student.id,
                date: new Date(),
                hours: 1,
                // If the user is PAYING the lesson, then we should create a record with no hours
                // left (as it is a one off), otherwise if it is an unpay lesson (refund ish), we should
                // give them an extra hour.
                hoursLeft: data.paid ? 0 : 1,
              },
            });
            // This data object will then be used to update the lesson.
            // TODO: Transaction safe.
            data = {
              ...data,
              hourBankId: data.paid ? oneoffBank.id : undefined,
            };
          } else {
            const updatedBank = await prisma.hourBanks.update({
              where: {
                id: totalBanks.student.hourBanks[0].id,
              },
              data: {
                hoursLeft: {
                  decrement: data.paid ? 1 : -1,
                },
                hours: {
                  increment:
                    totalBanks.student.hourBanks[0].hours ===
                      totalBanks.student.hourBanks[0].hoursLeft && !data.paid
                      ? 1
                      : 0,
                },
              },
            });
            data = {
              ...data,
              hourBankId: data.paid ? updatedBank.id : undefined,
            };
          }
        }

        const updateLesson = await prisma.lessons.update({
          where: {
            id: lessonId,
          },
          data: {
            ...data,
            date: data.date ? new Date(data.date) : undefined,
          },
        });
        return updateLesson;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
  },
};
