import { Component, OnInit } from '@angular/core';
import { CreateRoomService } from 'src/app/service/create-room.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  roomKey: string = '';
  constructor(
    private createRoom: CreateRoomService,
  ){}
  ngOnInit(){
    this.roomKey = this.createRoom.roomKey;
  }
}
