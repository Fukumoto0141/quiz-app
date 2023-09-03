import { Data } from "@angular/router";

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
export interface room {
  enemyHp: number;
  hostUser: string;
  startTime: Date;
}
export interface user {
  name: string;
  isHost: boolean
}
