import { Component, inject } from '@angular/core';

import { Auth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  email: string = 'fukukou1256@gmail.com';
  password: string = 'piyo1234';
  isVerified = true;

  constructor(
    private auth: Auth = inject(Auth),
    private router: Router,
    private toastr: ToastrService
  ){}
  ngOnInit() {
    if(this.auth.currentUser){//アカウント登録直後のログイン
      this.email = this.auth.currentUser.email?this.auth.currentUser.email:'';
    }
  }

  login() {
    if(!this.email || !this.password) {
      console.log('a');
      return;
    }
    signInWithEmailAndPassword(this.auth, this.email, this.password).then(res => {

      if(!res.user.emailVerified){//本人確認されていない
        this.isVerified = false;
      }else if(res.user.displayName == null){//ユーザ名登録が済んでいない(初回ログイン)
        this.router.navigateByUrl('/uup');
      }else{//全てOK、TOP画面へ
        this.toastr.success('ログインしました。');
        this.router.navigateByUrl('/top');
      }
    }).catch(res => {
      alert('ログインできません。');
      console.log(res);

    });
  }
  reload(){
    this.ngOnInit();
  }
}
