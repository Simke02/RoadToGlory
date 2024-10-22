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



@NgModule({
  declarations: [
    GameComponent,
    BuildingsMenuComponent,
    UpgradesMenuComponent,
    ProductionMenuComponent,
    LobbyComponent,
    AddUpgradeMenuComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    GameObjectService,
    GameService,
    {
      provide: APP_INITIALIZER,
      useFactory: getUserInfoInitializer,
      deps: [AuthService, CurrentUserService],
      multi: true,
    },
  ]
})
export class GameObjectModule { }