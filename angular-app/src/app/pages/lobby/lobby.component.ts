import { Component } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, getDocs, onSnapshot, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { room, user } from 'src/app/question';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';
import { QuizService } from 'src/app/service/quiz.service';



@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  roomInfo: room= {
    enemyHp: 0,
    hostUser: '',
    startTime: new Date()
  };
  roomKey: string = '';
  isHost: boolean = false;
  users: Observable<user[]>;
  countdown: string = '';
  countFontSize = {};
  private TimerSubscription!: Subscription;

  constructor(
    private firestoreClient: FirestoreClientService,
    private quizService: QuizService,
    private firestore: Firestore,
    private router: Router
  ){
    this.roomKey = this.firestoreClient.roomKey;
    this.users = collectionData(collection(this.firestore, 'rooms', this.roomKey, 'users')) as Observable<user[]>;
    this.firestoreClient.getRoom(this.roomKey).then(val =>{ this.roomInfo = val; });
  }
  ngOnInit(){
    this.TimerSubscription = this.quizService._countSub$.subscribe(time =>{
      if(time.length > 1) {
        this.countFontSize = {'font-size':'100px'};
        setTimeout(() => {
          this.isHost? this.router.navigateByUrl('/game'): this.router.navigateByUrl('/answer');
          this.TimerSubscription.unsubscribe();
        }, 1000);
      }
      this.countdown = time;
    });

    this.isHost = this.firestoreClient.isHost;
    this.firestoreClient.roomKey = this.roomKey;
    //ログインしているユーザが参加者の場合のみルームドキュメントのSnapshotインスタンス作成
    //startTimeフィールドが更新された時のみゲームの開始処理が実行される
    if(!this.isHost){
      const unsub = onSnapshot(doc(this.firestore, "rooms", this.firestoreClient.roomKey), (doc) => {
        let startTime: Date = doc.get('startTime').toDate();
        if(startTime.getTime() !== this.roomInfo.startTime.getTime()){
          this.quizService.startTimer(startTime);
          unsub();
        }
      });
    }
  }
  hostStartGame(){
    this.firestoreClient.updateTime().then(startTime =>{
      this.quizService.startTimer(startTime);
    });
  }

}
