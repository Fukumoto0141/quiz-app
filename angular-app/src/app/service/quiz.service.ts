import { Injectable } from '@angular/core';
import { questionTypes } from '../question';
import { QUESTIONS } from '../questions';
import { FirestoreClientService } from './firestore-client.service';
import {  Subject, interval } from 'rxjs';
import{ DAMAGE, ONE_MILLISECOND, START_HP, START_QUIZ_COUNT, START_TIME_LIMIT, THOUSAND_MILLISECOND } from '../const'

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private _enemyHp: number = 0;
  private _result: string = '';
  //問題文のプロパティ
  private _currentQuizCount: number = 0;
  private _currentQuizStatement: string = '';
  private _currentQuizAnswer: string = '';
  //ゲーム開始までのカウントダウン用プロパティ
  private _timeCount: string = '';
  private _countSub = new Subject<string>();
  public _countSub$ = this._countSub.asObservable();
  //制限時間カウントダウン用プロパティ
  private _remainingTime: number = 0;
  private _timeSub = new Subject<number>();
  public _timeSub$ = this._timeSub.asObservable();

  constructor(
    private firestoreCliant: FirestoreClientService
  ) {
    this.createQuestion();
    this.initQuiz();
  }

  //初期化
  initQuiz(){
    this._enemyHp = START_HP;
    this.firestoreCliant.updateHp(START_HP);
    this._remainingTime = START_TIME_LIMIT;
    this._currentQuizCount = START_QUIZ_COUNT;
    this.result = '';
  }
  //問題文の作成
  private createQuestion(){
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
  //入力が空の場合は数値型の−１を引数として受け取り不正解となる
  checkAnswer(answer: number): boolean{
    if(answer.toString() == this._currentQuizAnswer){
      this._enemyHp -= DAMAGE;
      this.firestoreCliant.updateHp(-(DAMAGE));
      this.createQuestion();
      return true;
    }else{
      this.firestoreCliant.updateHp(0);
      this.createQuestion();
      return false;
    }
  }
  //ゲーム開始までのカウントダウン
  startTimer(startTime: Date){
    const start: number = startTime.getTime();
    const timer = interval(ONE_MILLISECOND).subscribe(() => {
      const now: number = new Date().getTime();
      const remainTime: number = start - now;
      if(remainTime <= THOUSAND_MILLISECOND) {
        timer.unsubscribe();
        this._timeCount = 'スタート';
        this._countSub.next(this._timeCount);
        return;
      }
      const difSec  = Math.floor(remainTime / THOUSAND_MILLISECOND);
      this._timeCount = difSec.toString();
      this._countSub.next(this._timeCount);
    });
  }
  //ゲーム終了までのカウントダウン
  timeLimitCount(){
    const timer = interval(THOUSAND_MILLISECOND).subscribe(() => {
      if(this._remainingTime == 0 || this._enemyHp == 0) {
        this._timeSub.next(this._remainingTime);
        timer.unsubscribe();
        return;
      }
      this._timeSub.next(this._remainingTime);
      this._remainingTime-=1;
    });
  }

  get currentQuizCount(): number{
    return this._currentQuizCount;
  }
  get currentQuizStatement(): string{
    return this._currentQuizStatement;
  }
  get result(): string{
    return this._result;
  }

  set result(result: string){
    this._result = result;
  }
  set enemyHp(enemyHp: number) {
    this._enemyHp = enemyHp;
  }
}
