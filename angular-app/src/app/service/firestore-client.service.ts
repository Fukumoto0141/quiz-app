import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {  DocumentReference, Firestore, addDoc, collection, doc, getDoc, increment, setDoc, updateDoc } from '@angular/fire/firestore';
import { damageLog, room, user } from '../question';
import { Router } from '@angular/router';
import { START_HP } from '../const';

@Injectable({
  providedIn: 'root'
})
export class FirestoreClientService {
  private _userInfo: user = {
    name: '',
    isHost: false,
    personalColor: 0
  };
  private _roomInfo: room = {
    enemyHp: 0,
    hostUser: '',
    startTime: new Date()
  }
  private _roomKey: string = '';
  private _uuid: string;
  // = this.auth.currentUser? this.auth.currentUser.uid: '';
  private _userName: string | null;
  // = this.auth.currentUser? this.auth.currentUser.displayName: '';
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
      addDoc(collection(this.firestore, 'rooms'),<room>{
        enemyHp: START_HP,
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
      this._userInfo = {
        name: this.auth.currentUser?.displayName? this.auth.currentUser.displayName: '',
        isHost: isHost,
        personalColor: (Math.random() * 360)
      };
      const userDoc = await doc(this.firestore, 'rooms', this._roomKey, 'users', this._uuid);
      setDoc(userDoc,this._userInfo)
    }

    //自身のユーザドキュメント取得
    async getUser(key: string){
      this._roomKey = key;
      //doc('firebaseインスタンス', 'コレクションID', 'ルームキー', 'サブコレクションID', 'ユーザID')
      const userDoc = doc(this.firestore, 'rooms', this._roomKey, 'users', this._uuid);
      getDoc(userDoc).then(async value =>{
        this._userInfo = {
          name: await value.get('name'),
          isHost: await value.get('isHost'),
          personalColor: await value.get('personalColor')
        };
        return this._userInfo;
      })
    }

    //ルームドキュメント取得
    async getRoom(key: string): Promise<room>{
      this._roomKey = key;
      //doc('firebaseインスタンス', 'コレクションID', 'ルームキー')
      const roomDoc = doc(this.firestore, 'rooms', this._roomKey);
      const docVal = await getDoc(roomDoc);
      this._roomInfo = {
        enemyHp: docVal.get('enemyHp'),
        hostUser: docVal.get('hostUser'),
        startTime: docVal.get('startTime').toDate()
      };
      return  this._roomInfo;
    }

    //敵のHPを更新
    updateHp(hp: number){
      updateDoc(doc(this.firestore, 'rooms', this._roomKey), {
        'enemyHp': hp<=0?increment(hp): hp
      });
      //非ダメのログを追加
      if(hp<=0) this.putDamageLog(hp?hp.toString():'miss');
    }

    //スタート時間の更新
    async updateTime(): Promise<Date>{
      let time = new Date();
      let startTime = new Date(time.setSeconds(time.getSeconds() + 5));
      const docVal = updateDoc(doc(this.firestore, 'rooms', this._roomKey), {
        'startTime': startTime
      });
      return startTime;
    }

    //ダメージログ挿入 rooms/uid/damageLog
    //hp更新で呼ばれる
    private async putDamageLog(damage: string){
      const damageLogDoc = await collection(this.firestore, 'rooms', this._roomKey, 'damageLog');
      addDoc(damageLogDoc,<damageLog>{
        damage: damage,
        userName: this.auth.currentUser?.displayName,
        damagedAt: new Date(),
        personalColor: this._userInfo.personalColor
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
