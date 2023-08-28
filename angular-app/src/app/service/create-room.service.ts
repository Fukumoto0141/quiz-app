import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { rooms, user } from '../question';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CreateRoomService {
  private firestore: Firestore = inject(Firestore);
  private _roomKey: string = '';

  constructor(
    private auth: Auth = inject(Auth),
    private router: Router
  ) {}

  async createRoom(){
    addDoc(collection(this.firestore, 'rooms'),<rooms>{
      enemyHp: 0,
      hostUser: this.auth.currentUser?.uid,
      startTime: new Date()
    }).then((documentReference: DocumentReference)=>{
      this._roomKey = documentReference.id;
      const uuid: string = this.auth.currentUser? this.auth.currentUser.uid: '';
      const userDoc = doc(this.firestore, 'rooms', this._roomKey, 'users', uuid);
      setDoc(userDoc,<user>{
        name: this.auth.currentUser?.displayName,
        isHost: true
      });
      this.router.navigateByUrl('/lobby');
    })
  }

  get roomKey(): string{
    return this._roomKey;
  }
}
