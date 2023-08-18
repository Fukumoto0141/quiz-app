import { Component, inject } from '@angular/core';
import { Firestore, doc, docData, onSnapshot } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { hp } from 'src/app/question';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-main-game-screen',
  templateUrl: './main-game-screen.component.html',
  styleUrls: ['./main-game-screen.component.scss']
})

export class MainGameScreenComponent {

  private firestore: Firestore = inject(Firestore);

  value: number = 0;
  //DBを監視して更新があれば反映させる
  unsub = onSnapshot(doc(this.firestore, "hp", "IUoZMfJV98TgINSdtigE"), (doc) => {
    this.value = doc.get('hp');
    console.log("Current data: ", doc.get('hp'));
})

}
