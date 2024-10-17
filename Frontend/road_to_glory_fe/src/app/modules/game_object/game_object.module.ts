import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { GameObjectService } from './services/game_object.service';
import { GameService } from './services/game.service';
import { BuildingsMenuComponent } from './components/buildings_menu/buildings_menu.component';
import { UpgradesMenuComponent } from './components/upgrades_menu/upgrades_menu.component';
import { ProductionMenuComponent } from './components/production_menu/production_menu.component';



@NgModule({
  declarations: [
    GameComponent,
    BuildingsMenuComponent,
    UpgradesMenuComponent,
    ProductionMenuComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [GameObjectService, GameService]
})
export class GameObjectModule { }