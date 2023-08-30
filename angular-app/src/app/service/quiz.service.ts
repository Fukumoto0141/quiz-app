import { Injectable, inject } from '@angular/core';
import { hp, questionTypes } from '../question';
import { QUESTIONS } from '../questions';
import { FirestoreClientService } from './firestore-client.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private _enemyHp: number = 100;
  private _currentQuizCount = 0;
  private _currentQuizStatement: string = '';
  private _currentQuizAnswer: string = '';

  constructor(
    private firestoreCliant: FirestoreClientService
  ) {
    this.createQuestion();
  }
  //問題文の作成
  createQuestion(){
    const questions = QUESTIONS;
    let questionParameterX: string;
    let targetQuestion = questions[Math.floor(Math.random() * questions.length)];
    this._currentQuizStatement = targetQuestion.statement;
    let tmp = Math.floor(Math.random() * 255);

    if(targetQuestion.type == questionTypes.DECIMAL){
      questionParameterX = tmp.toString();
      this._currentQuizAnswer = tmp.toString(2);
    }else{
      const binaryDigits: number = 8;
      const fourDigits: number = 4;
      questionParameterX = tmp.toString(2).padStart( binaryDigits, '0');
      questionParameterX = questionParameterX.slice(0, fourDigits) + ' ' + questionParameterX.slice(fourDigits);
      this._currentQuizAnswer = tmp.toString();
    }
    this._currentQuizStatement = this._currentQuizStatement.replace('X', questionParameterX);
    this._currentQuizCount++;
    return {
      quizCount: this._currentQuizCount,
      statement: this._currentQuizStatement,
      answer: this._currentQuizAnswer,
    }
  }
  //answerGameComponentで回答ボタンが押された時に呼び出す
  //入力が空の場合は数値型の−１を引数として受け取る
  checkAnswer(answer: number): boolean{
    const damage = 10;
    if(answer.toString() == this._currentQuizAnswer){
      this._enemyHp -= damage;
      this.firestoreCliant.updateHp(this._enemyHp);
      this.createQuestion();
      return true;
    }else{
      this.createQuestion();
      return false;
    }
  }

  get currentQuizCount(): number{
    return this._currentQuizCount;
  }
  get currentQuizStatement(): string{
    return this._currentQuizStatement;
  }

}
