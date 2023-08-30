import { Component, inject } from '@angular/core';
import { Firestore, doc, docData, getDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { hp } from 'src/app/question';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-main-game-screen',
  templateUrl: './main-game-screen.component.html',
  styleUrls: ['./main-game-screen.component.scss']
})

export class MainGameScreenComponent {
  private firestore: Firestore = inject(Firestore);
  value: number = 0;

  constructor(
    private firestoreClient: FirestoreClientService
  ){}
  //DBを監視して更新があれば反映させる
  private unsub = onSnapshot(doc(this.firestore, "rooms", this.firestoreClient.roomKey), (doc) => {
    this.value = doc.get('enemyHp');
    console.log("Current data: ", doc.get('enemyHp'));
  })
}
