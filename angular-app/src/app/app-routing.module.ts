import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './pages/top/top.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UpdateUserProfileComponent } from './pages/update-user-profile/update-user-profile.component';
import { MainGameScreenComponent } from './pages/main-game-screen/main-game-screen.component';
import { AnswerGameScreenComponent } from './pages/answer-game-screen/answer-game-screen.component';
import { ResultComponent } from './pages/result/result.component';
import { LobbyComponent } from './pages/lobby/lobby.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'top', component: TopComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'uup', component: UpdateUserProfileComponent },
  { path: 'game', component: MainGameScreenComponent },
  { path: 'answer', component: AnswerGameScreenComponent },
  { path: 'result', component: ResultComponent },
  { path: 'lobby', component: LobbyComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
