import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent {

  name: string ='';

  constructor(
    private auth: Auth = inject(Auth),
  ){
    if(this.auth.currentUser){
      this.name = this.auth.currentUser.displayName?this.auth.currentUser.displayName:'';
    }
  }
}
