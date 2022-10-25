import { MutationTypes, QueryTypes } from '@lessonlog/graphql-types';
import { prisma } from '../prisma';

// util function to get latest student price
async function getLatestPrice(id: string) {
  return await prisma.studentPrices.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 1,
    where: {
      studentId: id,
    }
  });
}

export const resolvers = {
  Query: {
    async students(): Promise<Array<QueryTypes.Student>> {
      try {
        const students = await prisma.students.findMany({
          include: {
            lessons: true,
            hourBanks: true,
            studentPrices: {
              orderBy: {
                date: 'desc',
              },
              take: 1,
            },
          },
        });
        return students;
      } catch (e: any) {
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
        .catch((e: any) => {
          console.log(e);
          return [];
        });
      return lessons;
    },
  },
  Mutation: {
    async addStudent(
      _: unknown,
      { name, startDate, price }: MutationTypes.Student
    ): Promise<{ name: string; startDate: Date } | undefined> {
      try {
        const newStudent = await prisma.students.create({
          data: {
            name: name,
            startDate: new Date(startDate),
          },
        });
        await prisma.studentPrices.create({
          data: {
            studentId: newStudent.id,
            price: price,
          }
        });
        return newStudent;
      } catch (e: any) {
        return undefined;
      }
    },
    async addLesson(
      _: unknown,
      { studentId, date, price, paid, summary, duration }: MutationTypes.Lesson
    ): Promise<QueryTypes.Lesson | undefined> {
      try {
        const newLesson = await prisma.lessons.create({
          data: {
            studentId: studentId,
            date: new Date(date),
            price: price,
            paid: !!paid,
            summary: summary,
            duration: duration,
          },
        });
        return newLesson;
      } catch (e: any) {
        console.log(e);
        return undefined;
      }
    },
    async addHourBank(
      _: unknown,
      { studentId, date, hours }: MutationTypes.HourBank
    ): Promise<QueryTypes.HourBank | undefined> {
      try {
        // Find the most up to date price to create an hour bank.
        const [latestPrice] = await getLatestPrice(studentId);
        if (!latestPrice) return undefined;

        const newHourBank = await prisma.hourBanks.create({
          data: {
            studentId: studentId,
            date: new Date(date),
            hours: hours,
            hoursLeft: hours,
            studentPriceId: latestPrice.id,
          },
        });
        return newHourBank;
      } catch (e: any) {
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
              duration: true,
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
            const [latestPrice] = await getLatestPrice(totalBanks.student.id);
            if (!latestPrice) return undefined;
            const oneoffBank = await prisma.hourBanks.create({
              data: {
                studentId: totalBanks.student.id,
                date: new Date(),
                hours: totalBanks.duration,
                // If the user is PAYING the lesson, then we should create a record with no hours
                // left (as it is a one off), otherwise if it is an unpay lesson (refund ish), we should
                // give them an extra hour.
                hoursLeft: data.paid ? 0 : totalBanks.duration,
                studentPriceId: latestPrice.id,
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
                  decrement: data.paid ? totalBanks.duration : -totalBanks.duration,
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
      } catch (e: any) {
        console.log(e);
        return undefined;
      }
    },
  },
};
