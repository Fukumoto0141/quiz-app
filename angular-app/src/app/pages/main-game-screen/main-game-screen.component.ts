import { Component, inject } from '@angular/core';
import { Firestore, doc, docData, getDoc, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { START_HP, START_TIME_LIMIT } from 'src/app/const';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-main-game-screen',
  templateUrl: './main-game-screen.component.html',
  styleUrls: ['./main-game-screen.component.scss']
})

export class MainGameScreenComponent {
  private TimeLimitSubscription!: Subscription;

  remainingTime: number = 0;
  progressTime: number = 0;
  Hp: number = 0;
  progressHP: number = 0;
  startHP: number = START_HP;

  constructor(
    private firestore: Firestore,
    private firestoreClient: FirestoreClientService,
    private quizService: QuizService,
    private router: Router
  ){
    this.quizService.timeLimitCount();
  }

  ngOnInit(){
    this.TimeLimitSubscription = this.quizService._timeSub$.subscribe(time =>{
      this.remainingTime = time;
      this.progressTime = (time/START_TIME_LIMIT) * 100;
      if(time == 0){
        this.unsub();
        this.TimeLimitSubscription.unsubscribe();
        setTimeout(() => {
          this.quizService.result = '撃破失敗...';
          this.router.navigateByUrl('/result');
        }, 1000);
      }
    });
  }

  //DBを監視して更新があれば反映させる
  private unsub = onSnapshot(doc(this.firestore, "rooms", this.firestoreClient.roomKey), (doc) => {
    console.log('aaaaa');
    this.Hp = doc.get('enemyHp');
    this.progressHP = (this.Hp/START_HP) * 100;
    this.quizService.enemyHp = this.Hp;
    if(this.Hp <= 0) {
      this.TimeLimitSubscription.unsubscribe();
      this.unsub();
      this.quizService.result = '撃破！';
      this.router.navigateByUrl('/result');
    }
  });
}
