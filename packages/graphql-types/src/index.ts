// Naming convention: Singular type for the specific entity
export namespace QueryTypes {
  export interface Lesson {
    id: string;
    studentId: string;
    date: Date;
    price: number;
    summary: string | null;
  }
  export interface Student {
    id: string;
    name: string;
    startDate: number;
    lessons: Array<Lesson>;
  }
}

export namespace MutationTypes {
  export interface Student {
    name: string;
    startDate: Date;
  }
  export interface Lesson {
    studentId: string;
    date: Date;
    price: number;
    summary?: string;
  }
}
