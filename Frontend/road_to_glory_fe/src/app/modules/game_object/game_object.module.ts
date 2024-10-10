import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { GameService } from './services/game.service';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [GameService]
})
export class GameObjectModule { }