import { Injectable, inject } from '@angular/core';
import { hp, questionTypes } from '../question';
import { QUESTIONS } from '../questions';
import { Firestore, collection, doc, docData, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, async, take } from 'rxjs';
import { leadingComment } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private firestore: Firestore = inject(Firestore);
  private docRef = doc(this.firestore, 'hp', 'IUoZMfJV98TgINSdtigE');

  private _enemyHp: number = 100;
  private _currentQuizCount = 0;
  private _currentQuizStatement: string = '';
  private _currentQuizAnswer: string = '';

  constructor(
  ) {
    setDoc(this.docRef, {
      hp: this._enemyHp
    })
    this.createQuestion();
  }


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

  checkAnswer(answer: number): boolean{
    const damage = 10;
    let isCorrect = false
    if(answer.toString() == this._currentQuizAnswer){
      this._enemyHp -= damage;

      setDoc(this.docRef, {
        hp: this._enemyHp
      })
      let hpDoc = docData(this.docRef) as Observable<hp>;
      isCorrect = true;
    }
    this.createQuestion();
    return isCorrect;
  }


  get currentQuizCount(): number{
    return this._currentQuizCount;
  }
  get currentQuizStatement(): string{
    return this._currentQuizStatement;
  }

}
