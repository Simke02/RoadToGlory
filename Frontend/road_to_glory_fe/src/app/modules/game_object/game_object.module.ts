import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { GameObjectService } from './services/game_object.service';
import { GameService } from './services/game.service';
import { BuildingsMenuComponent } from './components/buildings_menu/buildings_menu.component';
import { UpgradesMenuComponent } from './components/upgrades_menu/upgrades_menu.component';
import { ProductionMenuComponent } from './components/production_menu/production_menu.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { AddUpgradeMenuComponent } from './components/add_upgrade_menu/add_upgrade_menu.component';
import { GameOverComponent } from './components/game_over/game_over.component';



@NgModule({
  declarations: [
    GameComponent,
    BuildingsMenuComponent,
    UpgradesMenuComponent,
    ProductionMenuComponent,
    LobbyComponent,
    AddUpgradeMenuComponent,
    GameOverComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [GameObjectService, GameService]
})
export class GameObjectModule { }