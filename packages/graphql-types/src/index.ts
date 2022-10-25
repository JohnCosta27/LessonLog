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
    hourBankId: string | null;
  }
  export interface Student {
    id: string;
    name: string;
    startDate: Date;
    lessons: Array<Lesson>;
    hourBanks: Array<HourBank>;
    studentPrices: Array<StudentPrice>;
  }
  export interface HourBank {
    id: string;
    studentId: string;
    date: Date;
    hours: number;
    hoursLeft: number;
  }
  export interface StudentPrice {
    id: string;
    studentId: string;
    price: number;
    date: Date;
  }
}

export namespace MutationTypes {
  export interface Student {
    name: string;
    startDate: number;
    price: number;
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
  export interface HourBank {
    studentId: string;
    date: number;
    hours: number;
  }
}
