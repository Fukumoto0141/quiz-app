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
    // let room = this.firestoreClient.getRoom(this.roomKey).then(val =>{
    //   if(val.enemyHp <= 0) {
    //     this.result = '撃破！';
    //   }else{
    //     this.result = '撃破失敗...';
    //   }
    // })
    this.result = this.quizService.result;
  }
  backLobby(){
    this.quizService.initQuiz();
    this.router.navigateByUrl('/lobby');
  }
}
