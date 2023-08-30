import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.scss']
})
export class CreateRoomDialogComponent {

  private _roomKey: string = '';

  constructor(
    private firestoreClient: FirestoreClientService
  ){}

  roomCreation(){
    this.firestoreClient.insertRoom();
  }
}
