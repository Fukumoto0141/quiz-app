import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';

@Component({
  selector: 'app-login-firebase-ui',
  templateUrl: './login-firebase-ui.component.html',
  styleUrls: ['./login-firebase-ui.component.css']
})
export class LoginFirebaseUIComponent implements OnInit {
  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.user = this.angularFireAuth.authState;
  }

  // ログアウト
  async logout() {
    this.angularFireAuth.auth.signOut();
  }

  // 成功時のコールバック
  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log(signInSuccessData);
  }

  // 失敗時のコールバック
  async errorCallback(errorData: FirebaseUISignInFailure) {
    console.log(errorData);
  }

}
