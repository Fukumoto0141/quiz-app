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
          alert('E-mailを送信しました');
          console.log(created.user.displayName);
          console.log(created.user.emailVerified);
        });
      }catch (e) {
        console.error(e);
        alert('E-mailの送信に失敗しました');
      }
    });

    this.router.navigateByUrl('/signin');
  }
}
