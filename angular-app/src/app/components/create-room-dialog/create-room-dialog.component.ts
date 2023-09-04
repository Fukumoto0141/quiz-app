import { Component, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(
    private firestoreClient: FirestoreClientService,
    public dialogRef: MatDialogRef<CreateRoomDialogComponent>,
  ){}

  roomCreation(){
    this.dialogRef.close();
    this.firestoreClient.insertRoom();
  }
}
