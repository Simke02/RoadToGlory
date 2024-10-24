import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './modules/game_object/components/game/game.component';
import { SignUpComponent } from './modules/auth/components/sign_up/sign_up.component';
import { SignInComponent } from './modules/auth/components/sign-in/sign-in.component';
import { LobbyComponent } from './modules/game_object/components/lobby/lobby.component';
import { GameOverComponent } from './modules/game_object/components/game_over/game_over.component';
import { AuthGuard } from './modules/auth/guards/auth1.guard';
import { authGuard } from './modules/auth/guards/auth.guard';
import { PlayingGuard } from './modules/auth/guards/playing.guard';

const routes: Routes = [
  {
    path: '', 
    component: SignInComponent 
  },
  
  {
    path: 'game', 
    component: GameComponent,
    canActivate:[AuthGuard, PlayingGuard]
  },
  
  {
    path: 'signup', 
    component: SignUpComponent
  },
  
  {
    path: 'lobby', 
    component: LobbyComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'game_over', 
    component: GameOverComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
