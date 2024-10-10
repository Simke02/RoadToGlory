import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { GameObjectService } from './services/game_object.service';
import { GameService } from './services/game.service';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [GameObjectService, GameService]
})
export class GameObjectModule { }