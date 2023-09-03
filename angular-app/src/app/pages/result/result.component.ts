import { Component } from '@angular/core';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';

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
  ){}
  ngOnInit(){
    this.roomKey = this.firestoreClient.roomKey;
    let room = this.firestoreClient.getRoom(this.roomKey).then(val =>{
      if(val.enemyHp == 0) {
        this.result = '勝ち';
      }else{
        this.result = '負け';
      }
    })

  }
}
