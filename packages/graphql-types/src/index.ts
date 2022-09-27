// Naming convention: Singular type for the specific entity
export namespace QueryTypes {
  export interface Lesson {
    id: string;
    studentId: string;
    student?: Pick<Student, 'name'>;
    date: Date;
    price: number;
    paid: boolean;
    summary: string | null;
  }
  export interface Student {
    id: string;
    name: string;
    startDate: Date;
    lessons: Array<Lesson>;
    hourBanks: Array<HourBank>;
  }
  export interface HourBank {
    id: string;
    studentId: string;
    date: Date;
    hours: number;
    hoursLeft: number;
  }
}

export namespace MutationTypes {
  export interface Student {
    name: string;
    startDate: number;
  }
  export interface Lesson {
    studentId: string;
    date: number;
    price: number;
    paid?: boolean;
    hourBankId?: string;
    summary?: string;
  }
  export type UpdateLesson = Partial<Lesson> & {
    lessonId: string;
  };
}
