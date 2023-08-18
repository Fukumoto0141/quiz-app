import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CreateRoomService {


  private firestore: Firestore = inject(Firestore);
  private _roomKey: string = '';


  constructor() {

  }


  createRoomKey(sameKey?: string){
    if(sameKey){

    }else{
      this._roomKey = Math.random().toString(32).substring(2);
    }
  }

  async createRoom(){
    this.createRoomKey();
    //生成れたルームキーが既に存在すればもう一度
    const roomsDoc = await getDocs(collection(this.firestore, "rooms"));
    roomsDoc.forEach((doc) => {
      if(doc.get('roomKey') === this._roomKey) this.createRoomKey();
    });

    console.log(this._roomKey)
  }
}
