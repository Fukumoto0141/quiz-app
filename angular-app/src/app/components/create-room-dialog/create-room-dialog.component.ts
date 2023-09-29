import { Component, Inject, Injectable, ViewEncapsulation } from '@angular/core';
import { DialogPosition, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,//カプセル化の解除
})
export class CreateRoomDialogComponent {

  showCursor = true;


  constructor(
    private firestoreClient: FirestoreClientService,
    public dialogRef: MatDialogRef<CreateRoomDialogComponent>,
  ){

  }

  roomCreation(){
    this.dialogRef.close();
    this.firestoreClient.insertRoom();
  }
}
