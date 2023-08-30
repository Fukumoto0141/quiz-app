import { Component } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, getDocs, onSnapshot, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { user } from 'src/app/question';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  roomKey: string = '';
  isHost: boolean = false;
  users: Observable<user[]>
  constructor(
    private firestoreClient: FirestoreClientService,
    private firestore: Firestore,
    private router: Router
  ){
    this.roomKey = this.firestoreClient.roomKey;
    const userProfileCollection = collection(this.firestore, 'rooms', this.roomKey, 'users');
    this.users = collectionData(userProfileCollection) as Observable<user[]>;
  }
  ngOnInit(){
    this.isHost = this.firestoreClient.isHost;
    this.firestoreClient.roomKey = this.roomKey;
  }

  startGame(){
    this.router.navigateByUrl('/game')//仮
  }
  test(){
    this.router.navigateByUrl('/answer')//仮

  }
}
