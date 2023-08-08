export interface Question {
  id: number;
  statement: string;
  type: questionTypes;
}

export enum questionTypes {
  BINARY,
  DECIMAL,
}

export interface newQuestion {
  id: number;
  statement:string;
  answer:string;
}
