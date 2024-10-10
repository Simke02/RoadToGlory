import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './modules/game_object/components/game/game.component';

const routes: Routes = [
  //Trenutno sam postavio da game bude pocetna pozicija, ali to nece biti tako
  {path: '', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
