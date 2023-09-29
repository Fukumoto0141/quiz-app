import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  roomKey: string = '';
  result: string = ''
  constructor(
    private firestoreClient: FirestoreClientService,
    private router: Router,
    private quizService: QuizService
  ){}
  ngOnInit(){
    this.roomKey = this.firestoreClient.roomKey;

    this.result = this.quizService.result;
  }
  backLobby(){
    this.quizService.initQuiz();
    this.router.navigateByUrl('/lobby');
  }
}
