import { Component, inject } from '@angular/core';
import { Firestore, doc, docData, getDoc, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-main-game-screen',
  templateUrl: './main-game-screen.component.html',
  styleUrls: ['./main-game-screen.component.scss']
})

export class MainGameScreenComponent {
  private firestore: Firestore = inject(Firestore);
  private TimeLimitSubscription!: Subscription;
  remainingTime: number = 0;
  starttimeLimit: number = this.quizService.startTimeLimit;
  Hp: number = 0;
  startHp: number = this.quizService.startHp;

  constructor(
    private firestoreClient: FirestoreClientService,
    private quizService: QuizService,
    private router: Router
  ){
    this.quizService.timeLimitCount();
  }

  ngOnInit(){
    this.TimeLimitSubscription = this.quizService._timeSub$.subscribe(time =>{
      this.remainingTime = time;
      if(time == 0){
        this.unsub();
        this.TimeLimitSubscription.unsubscribe();
        setTimeout(() => {
          this.quizService.result = '負け';
          this.router.navigateByUrl('/result');
        }, 1000);
      }
    });
  }

  //DBを監視して更新があれば反映させる
  private unsub = onSnapshot(doc(this.firestore, "rooms", this.firestoreClient.roomKey), (doc) => {
    this.Hp = doc.get('enemyHp');
    this.quizService.enemyHp = this.Hp;
    if(this.Hp <= 0) {
      this.TimeLimitSubscription.unsubscribe();
      this.unsub();
      this.quizService.result = '勝ち';
      this.router.navigateByUrl('/result');
    }
  });
}
