import { Component, inject } from '@angular/core';

import { Auth, updateProfile} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent {

  newUserName: string = '';

  constructor(
    private auth: Auth = inject(Auth),
    private router: Router,
  ){}

  updateUserName(){
    if(this.auth.currentUser && this.newUserName){
      updateProfile(this.auth.currentUser, {
        displayName: this.newUserName,
      }).then(() => {
        alert('ユーザ名を登録しました。');
        this.router.navigateByUrl('/top');
      }).catch((error) => {
        console.log(error);
      });
    }else{
      alert('ユーザ名の登録に失敗しました');
    }

  }

}
