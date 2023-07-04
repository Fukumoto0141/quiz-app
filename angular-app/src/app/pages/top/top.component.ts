import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent {

  name: string ='';

  constructor(
    private auth: Auth = inject(Auth),
    private router: Router,
  ){
    if(this.auth.currentUser){
      this.name = this.auth.currentUser.displayName?this.auth.currentUser.displayName:'';
    }else{
      this.router.navigateByUrl('/siguin');
    }
  }
}
