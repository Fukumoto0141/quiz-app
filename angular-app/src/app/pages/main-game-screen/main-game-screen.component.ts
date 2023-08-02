import { Component } from '@angular/core';

@Component({
  selector: 'app-main-game-screen',
  templateUrl: './main-game-screen.component.html',
  styleUrls: ['./main-game-screen.component.scss']
})
export class MainGameScreenComponent {
  value:number = 0;
  add(x:number){
  this.value = x;
  }
}
