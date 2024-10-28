import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './modules/game_object/components/game/game.component';
import { SignUpComponent } from './modules/auth/components/sign_up/sign_up.component';
import { SignInComponent } from './modules/auth/components/sign-in/sign-in.component';
import { LobbyComponent } from './modules/game_object/components/lobby/lobby.component';
import { GameOverComponent } from './modules/game_object/components/game_over/game_over.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { PlayingGuard } from './modules/auth/guards/playing.guard';
import { HomeComponent } from './modules/game_object/components/home/home.component';
import { StatsComponent } from './modules/game_object/components/stats/stats.component';
import { AntiAuthGuard } from './modules/auth/guards/anti_auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: SignInComponent,
    canActivate:[AntiAuthGuard]
  },
  
  {
    path: 'game', 
    component: GameComponent,
    canActivate:[AuthGuard, PlayingGuard]
  },
  
  {
    path: 'signup', 
    component: SignUpComponent,
    canActivate: [AntiAuthGuard]
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
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
