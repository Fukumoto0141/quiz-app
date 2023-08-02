import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Auth, createUserWithEmailAndPassword, getAuth, sendEmailVerification } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(
    private auth: Auth = inject(Auth),
    private router: Router,
  ){  }

  newEmail = '';
  newPassword = '';

  public onSubmit() {

    const authth = getAuth();

    createUserWithEmailAndPassword(this.auth, this.newEmail, this.newPassword)
    .then(created => {
      try{
        sendEmailVerification(created.user).then(() => {
          alert('認証用のリンクを記載した E-mail を送信しました。リンクにアクセスして認証してください。');
        });
      }catch (e) {
        console.error(e);
        alert('ユーザ登録に失敗しました。すでに登録されているメールアドレスか無効なパスワードが入力されました。');
      }
    });

    this.router.navigateByUrl('/signin');
  }
}
