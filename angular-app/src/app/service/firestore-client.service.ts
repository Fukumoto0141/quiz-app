import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {  DocumentReference, Firestore, addDoc, collection, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { hp, rooms, user } from '../question';
import { Router } from '@angular/router';
import { update } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirestoreClientService {
  private _user: user = {
    name: '',
    isHost: false
  };
  private _roomKey: string = '';
  private _uuid: string;
  private _userName: string | null;
  private _isHost: boolean = false;

  constructor(
    private firestore: Firestore = inject(Firestore),
    private auth: Auth = inject(Auth),
    private router: Router,
    ) {
      this._uuid = this.auth.currentUser? this.auth.currentUser.uid: '';
      this._userName = this.auth.currentUser? this.auth.currentUser.displayName: '';
    }

    //ルームドキュメント作成・初期値挿入(ルーム作成時のみ実行)
    async insertRoom(){
      addDoc(collection(this.firestore, 'rooms'),<rooms>{
        enemyHp: 100,
        hostUser: this._uuid,
        startTime: new Date()
      }).then((documentReference: DocumentReference)=>{
        this._roomKey = documentReference.id;
        this.putUser(this._roomKey, true).then(()=>{
          this.router.navigateByUrl('/lobby');
        });
      })
    }
    //rooms/uid/usersにユーザ情報を挿入
    async putUser(key: string, isHost: boolean){
      this._roomKey = key;
      this._isHost = isHost;
      const userDoc = await doc(this.firestore, 'rooms', this._roomKey, 'users', this._uuid);
      setDoc(userDoc,<user>{
        name: this.auth.currentUser?.displayName,
        isHost: isHost
      })
    }

    //自身のユーザドキュメント取得
    async getUser(key: string){
      this._roomKey = key;
      //doc('firebaseインスタンス', 'コレクションID', 'ルームキー', 'サブコレクションID', 'ユーザID')
      const userDoc = doc(this.firestore, 'rooms', this._roomKey, 'users', this._uuid);
      getDoc(userDoc).then(async value =>{
        this._user = {
          name: await value.get('name'),
          isHost: await value.get('isHost')
        };
        console.log(this._user);
        return this._user;
      })
    }

    //敵のHPを更新
    updateHp(hp: number){
      updateDoc(doc(this.firestore, 'rooms', this._roomKey), {
        'enemyHp': hp
      })
    }

    get roomKey(): string{
      return this._roomKey;
    }
    get userName(): string|null{
      return this._userName;
    }
    get isHost(): boolean{
      return this._isHost;
    }

    set roomKey(key:string){
      this._roomKey = key;
    }


}
