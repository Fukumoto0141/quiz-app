import { Injectable } from '@angular/core';
import { QUESTIONS } from '../questions';
import { Question, questionTypes, newQuestion } from '../question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsCreationService {

  constructor() { }

  private currentQuizCount = 0;

  createQuestion(){

    const questions = QUESTIONS;
    let questionParameterX: string;
    let newStatement: string;
    let newAnswer: string;

    let targetQuestion = questions[Math.floor(Math.random() * questions.length)];

    newStatement = targetQuestion.statement;

    let tmp = Math.floor(Math.random() * 255);
    if(targetQuestion.type == questionTypes.DECIMAL){
      questionParameterX = tmp.toString();
      newAnswer = tmp.toString(2);

    }else{
      const binaryDigits: number = 8;
      const fourDigits: number = 4;
      questionParameterX = tmp.toString(2).padStart( binaryDigits, '0');
      questionParameterX = questionParameterX.slice(0, fourDigits) + ' ' + questionParameterX.slice(fourDigits);
      newAnswer = tmp.toString();

    }

    newStatement = newStatement.replace('X', questionParameterX);

    this.currentQuizCount++;

    return {
      quizCount: this.currentQuizCount,
      statement: newStatement,
      answer: newAnswer,
    }
  }



}
