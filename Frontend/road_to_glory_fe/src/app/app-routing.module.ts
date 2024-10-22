import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './modules/game_object/components/game/game.component';
import { SignUpComponent } from './modules/auth/components/sign_up/sign_up.component';
import { SignInComponent } from './modules/auth/components/sign-in/sign-in.component';
import { LobbyComponent } from './modules/game_object/components/lobby/lobby.component';
import { GameOverComponent } from './modules/game_object/components/game_over/game_over.component';

const routes: Routes = [
  {path: '', component: SignInComponent },
  {path: 'game', component: GameComponent},
  {path: 'signup', component: SignUpComponent },
  {path: 'lobby', component: LobbyComponent},
  {path: 'game_over', component: GameOverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
