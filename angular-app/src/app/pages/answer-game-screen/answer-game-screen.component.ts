import { Component } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { START_TIME_LIMIT } from 'src/app/const';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-answer-game-screen',
  templateUrl: './answer-game-screen.component.html',
  styleUrls: ['./answer-game-screen.component.scss']
})
export class AnswerGameScreenComponent {
  statement:string = '';
  quizCount: number = 0;
  answer?: number;
  remainingTime: number = 0;
  progressVal: number = 0;
  private TimeLimitSubscription!: Subscription;
  //DBの更新を監視・反映させる
  private unsub = onSnapshot(doc(this.firestore, "rooms", this.firestoreClientService.roomKey), (doc) => {
    let Hp: number= doc.get('enemyHp');
    if(Hp <= 0){
      this.unsub();
      this.TimeLimitSubscription.unsubscribe();
      this.quizService.result = '撃破！';
      this.router.navigateByUrl('/result');
    }
  });

  constructor(
    private firestoreClientService: FirestoreClientService,
    private quizService: QuizService,
    private firestore: Firestore,
    private router: Router
  ) {
    this.quizService.timeLimitCount();
  }

  ngOnInit(): void {
    //制限時間をテンプレートに反映
    this.TimeLimitSubscription = this.quizService._timeSub$.subscribe(time =>{
      this.remainingTime = time;
      this.progressVal = (time/START_TIME_LIMIT) * 100;
      if(time <= 0){
        setTimeout(() => {
          this.TimeLimitSubscription.unsubscribe();
          this.unsub();
          this.quizService.result = '撃破失敗...';
          this.router.navigateByUrl('/result');
        }, 1000);
      }
    });
    this.statement = this.quizService.currentQuizStatement;
    this.quizCount = this.quizService.currentQuizCount;
  }
//回答ボタンが押された時の処理
//正誤判定、問題文と問題数の更新、回答フィールドの値初期化
  checkAnswer(){
    if(this.quizService.checkAnswer(this.answer? this.answer: -1)){
      console.log('正解');
    }else{
      console.log('不正解');
    }
    this.statement = this.quizService.currentQuizStatement;
    this.quizCount = this.quizService.currentQuizCount;
    this.answer = undefined;
  }



}
