import { Question } from "./question";
import { questionTypes } from "./question";

export const QUESTIONS: Question[] = [

  { id: 1, statement: '10進数「X」を2進数に変換せよ。', type: questionTypes.DECIMAL},
  { id: 2, statement: '2進数「X」を10進数に変換せよ。', type: questionTypes.BINARY},

];
