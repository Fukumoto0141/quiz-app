import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreateRoomService } from 'src/app/service/create-room.service';

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
    private createRoom: CreateRoomService,
  ){}

  roomCreation(){
    this.createRoom.createRoom();
  }
}
