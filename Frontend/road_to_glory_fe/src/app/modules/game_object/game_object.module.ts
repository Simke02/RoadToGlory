import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { GameObjectService } from './services/game_object.service';
import { GameService } from './services/game.service';
import { BuildingsMenuComponent } from './components/buildings_menu/buildings_menu.component';
import { UpgradesMenuComponent } from './components/upgrades_menu/upgrades_menu.component';
import { ProductionMenuComponent } from './components/production_menu/production_menu.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { AddUpgradeMenuComponent } from './components/add_upgrade_menu/add_upgrade_menu.component';
import { getUserInfoInitializer } from '../initializer/get_user_info.initializer';
import { CurrentUserService } from '../auth/services/current_user.service';
import { AuthService } from '../auth/services/auth.service';
import { GameOverComponent } from './components/game_over/game_over.component';
import { SelectedMenuComponent } from './components/selected_menu/selected_menu.component';
import { HomeComponent } from './components/home/home.component';
import { StatsComponent } from './components/stats/stats.component';
import { PersistenceService } from './services/persistence.service';



@NgModule({
  declarations: [
    GameComponent,
    BuildingsMenuComponent,
    UpgradesMenuComponent,
    ProductionMenuComponent,
    LobbyComponent,
    AddUpgradeMenuComponent,
    GameOverComponent,
    SelectedMenuComponent,
    HomeComponent,
    StatsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    GameObjectService,
    GameService,
    PersistenceService
  ]
})
export class GameObjectModule { }