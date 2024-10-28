import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { GameObjectService } from '../../services/game_object.service';
import { CommunicationService } from 'src/app/modules/communication/services/communication.service';
import { GameService } from '../../services/game.service';
import { Position } from 'src/app/common/models/position/position.model';
import { BuildingsDto } from 'src/app/common/models/dto/buildings.dto';
import { PositionStep } from 'src/app/common/models/position/position_step.model';
import { Unit } from 'src/app/common/models/unit/unit.model';
import { BasicFacility } from 'src/app/common/models/basic_facility.model';
import { ResourceFacility } from 'src/app/common/models/facility/resource_facility.model';
import { Facility } from 'src/app/common/models/facility/facility.model';
import { UpgradesDto } from 'src/app/common/models/dto/upgrades.dto';
import { ProductionDto } from 'src/app/common/models/dto/production.dto';
import { Upgrade } from 'src/app/common/models/upgrade/upgrade.model';
import { CurrentUserService } from 'src/app/modules/auth/services/current_user.service';
import { map, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { City } from 'src/app/common/models/city/city.model';
import { PersistenceService } from '../../services/persistence.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  private player: string="";
  private room:string="0";
  private left: boolean = true;
  terrain: string[][] = [];
  private player_units: Unit[] = [];
  private enemy_units: Unit[] = [];
  private player_resource_facilities: ResourceFacility[] = [];
  private player_production_facilities: Facility[] = [];
  private enemy_facilities: BasicFacility[] = [];
  private player_city: City = { x_coor: -1, y_coor: -1, health: 0, icon: ""};
  private enemy_city: City = { x_coor: -1, y_coor: -1, health: 0, icon: ""};
  player_upgrades: Upgrade[] = []; //Koje upgradove ima korisnik i koliko kosta da se postave na jedinicu
  gold: number = 500;//50;
  available_resources: {grain: number, iron: number} = {grain: 1000, iron: 1000};
  buildings_menu: boolean = false;
  production_menu: boolean = false;
  upgrades_menu: boolean = false;
  add_upgrades_menu: boolean = false;
  selected_menu: boolean = false;
  health: number = 0;
  buildings: BuildingsDto = {building_names: [], gold_cost: []};
  //production: ProductionDto = {iron_cost: [], grain_cost: [], unit_name: []};
  upgrades: UpgradesDto = {upgrade_name: [], gold_cost: []};
  private selected_x: number = -1;
  private selected_y: number = -1;
  selected_facility: Facility = {x_coor: -1, y_coor: -1, health: 0, icon: "", iron_cost: [], grain_cost: [], unit_name: [], type: ""};
  my_turn: boolean = true;
  private possible_moves: PositionStep[] = [];
  private selected_unit: Unit = {id: 0, x_coor: -1, y_coor: -1, health: 0, strenght: 0, range: 0, steps: 0, steps_left: 0, upgrade: "", finished_turn: true, icon: ""};
  private selected_cell: {x_coor: number, y_coor: number} = {x_coor: -1, y_coor: -1};
  private finnished_game: boolean = false;

  logged_in: boolean = false;
  logged_in_sub: Subscription;

  // authenticated$ = this.current_user_service
  //   .getCurrentUser$()
  //   .pipe(map((user) => !!user));


  constructor(
    private game_object_service: GameObjectService,
    private communication_service: CommunicationService,
    private auth_service: AuthService,
    private game_service: GameService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private persistence_service: PersistenceService
  ) {

    const potential_room = sessionStorage.getItem("room_id");
    if(potential_room){
      this.room = JSON.parse(potential_room).toString();
    }

    this.logged_in_sub = this.auth_service.logged_in.subscribe({
      next:(logged)=>{
        this.logged_in = logged;
      }
    })

  }
          

  ngOnInit(): void {
    window.addEventListener('beforeunload', this.unloadNotification);

    this.player = sessionStorage.getItem('username')!;

    const token = sessionStorage.getItem('token');
    
    if(token){
      this.auth_service.logged_in.next(true);
    }
    else
      this.auth_service.logged_in.next(false);

    //Kreiranje igre
    this.game_object_service.createGame(this.room)
    .subscribe({
      next: (new_game) => {
        console.log(new_game);
        if(new_game.first_player === this.player){
          this.player_city = new_game.first_city;
          this.enemy_city = new_game.second_city;
          this.left = true;
        }
        else if(new_game.second_player === this.player){
          this.player_city = new_game.second_city;
          this.enemy_city = new_game.first_city;
          this.left = false;
          this.my_turn = false;
          this.gold -= 2;
        }
      }
    })

    this.game_object_service.getTerrain(this.room).subscribe({
      next: (terrain) => {
        this.terrain = terrain;

        setTimeout(() => {
          this.displayIconAtCell(this.player_city.x_coor, this.player_city.y_coor, this.player_city.icon, this.left);
          this.displayIconAtCell(this.enemy_city.x_coor, this.enemy_city.y_coor, this.enemy_city.icon, !this.left);
        });
      }
    });
      
    this.communication_service.getLeave()
    .subscribe({
      next:(message)=>{
        //ovde mozda da se pozove funkcija da se proosledi winner 
        console.log(message);
      }
    });


    this.communication_service.getAttack()
    .subscribe({
      next: (attack)=>{
        if(attack.attacker.health > 0){
          if(attack.defender.health <= 0 && attack.attacker.range == 1){
            const i = this.enemy_units.findIndex(unit => unit.id === attack.attacker.id);
            this.removeIconFromCell(this.enemy_units[i].x_coor, this.enemy_units[i].y_coor);
            this.displayIconAtCell(attack.attacker.x_coor, attack.attacker.y_coor, attack.attacker.icon, !this.left);
          }
          this.enemy_units[this.enemy_units.findIndex(unit => unit.id === attack.attacker.id)] = attack.attacker;
        }
        else {
          this.enemy_units.splice(this.enemy_units.findIndex(unit => unit.id === attack.attacker.id), 1);
          this.removeIconFromCell(attack.attacker.x_coor, attack.attacker.y_coor);
        }

        if(attack.defender.health > 0)
          this.player_units[this.player_units.findIndex(unit => unit.id === attack.defender.id)] = attack.defender;
        else {
          this.player_units.splice(this.player_units.findIndex(unit => unit.id === attack.defender.id), 1);
          this.removeIconFromCell(attack.defender.x_coor, attack.defender.y_coor);
        }

        console.log(this.player_units);
        console.log(this.enemy_units);
      }
    });

    this.communication_service.getDestroy()
    .subscribe({
      next:(destroy)=>{
        if(destroy.object.health <= 0){
          this.removeIconFromCell(destroy.object.x_coor, destroy.object.y_coor);
          if(this.game_service.isProductionFacility(destroy.object))
            this.player_production_facilities.splice(this.player_production_facilities.findIndex(facility => facility.x_coor === destroy.object.x_coor && facility.y_coor === destroy.object.y_coor), 1);
          else if(this.game_service.isResourceFacility(destroy.object))
            this.player_resource_facilities.splice(this.player_resource_facilities.findIndex(facility => facility.x_coor === destroy.object.x_coor && facility.y_coor === destroy.object.y_coor), 1);
          
          if( destroy.attacker.range == 1) {
            const i = this.enemy_units.findIndex(unit => unit.id === destroy.attacker.id);
            this.removeIconFromCell(this.enemy_units[i].x_coor, this.enemy_units[i].y_coor);
            this.displayIconAtCell(destroy.attacker.x_coor, destroy.attacker.y_coor, destroy.attacker.icon, !this.left);
          }
        }
        else {
          if(this.game_service.isProductionFacility(destroy.object))
            this.player_production_facilities[this.player_production_facilities.findIndex(facility => facility.x_coor === destroy.object.x_coor && facility.y_coor === destroy.object.y_coor)] = destroy.object;
          else if(this.game_service.isResourceFacility(destroy.object))
            this.player_resource_facilities[this.player_resource_facilities.findIndex(facility => facility.x_coor === destroy.object.x_coor && facility.y_coor === destroy.object.y_coor)] = destroy.object;
        }

        this.enemy_units[this.enemy_units.findIndex(unit => unit.id === destroy.attacker.id)] = destroy.attacker;

        console.log(this.player_production_facilities);
        console.log(this.player_resource_facilities);
        console.log(this.enemy_units);
      }
    });

    this.communication_service.getDestroyCity()
    .subscribe({
      next: (destroy) => {
        if(destroy.object.health <= 0){
          this.removeIconFromCell(destroy.object.x_coor, destroy.object.y_coor);
          this.player_city = { x_coor: -1, y_coor: -1, health: 0, icon: ""};

          if( destroy.attacker.range == 1) {
            const i = this.enemy_units.findIndex(unit => unit.id === destroy.attacker.id);
            this.removeIconFromCell(this.enemy_units[i].x_coor, this.enemy_units[i].y_coor);
            this.displayIconAtCell(destroy.attacker.x_coor, destroy.attacker.y_coor, destroy.attacker.icon, !this.left);
          }
        }
        else
          this.player_city = destroy.object;

        this.enemy_units[this.enemy_units.findIndex(unit => unit.id === destroy.attacker.id)] = destroy.attacker;

        console.log(this.player_city);
        console.log(this.enemy_units);
      }
    })

    this.communication_service.getMove()
    .subscribe({
      next:(unit)=>{
        if(this.game_service.isUnit(unit)){
          const index = this.enemy_units.findIndex(u => u.id === unit.id);
          const old_unit = this.enemy_units[index];
          if (index !== -1) {
            this.enemy_units.splice(index, 1);
          }
          this.enemy_units.push(unit);

          //2 Skinemo ikonicu i postavimo novu
          this.removeIconFromCell(old_unit.x_coor, old_unit.y_coor);
          this.displayIconAtCell(unit.x_coor, unit.y_coor, unit.icon, !this.left);
        }
      }
    });

    this.communication_service.getProduceUnit()
    .subscribe({
      next:(unit)=>{
        if(this.game_service.isUnit(unit)){
          this.enemy_units.push(unit);
          this.displayIconAtCell(unit.x_coor, unit.y_coor, unit.icon, !this.left);
        }
      }
    });

    this.communication_service.getProduceFacility()
    .subscribe({
      next:(facility)=>{
        if(this.game_service.isBasicFacility(facility)){
          this.enemy_facilities.push(facility);
          this.displayIconAtCell(facility.x_coor, facility.y_coor, facility.icon, !this.left);
        }
      }
    });

    this.communication_service.getNextTurn()
    .subscribe({
      next:()=>{
        //Moramo i serveru da posaljemo da je doslo do sledeceg poteza
        this.game_object_service.nextTurn({player_name: this.player, left: this.left, room: this.room})
        .subscribe({
          next: () => {
            this.my_turn = true;
            this.player_units.forEach(unit => {
              unit.finished_turn = false;
              unit.steps_left = unit.steps;
            });
            this.gold += 2;
            this.player_resource_facilities.forEach(facility => {
              if(facility.type === "iron")
                this.available_resources.iron += 7;
              else if(facility.type === "grain")
                this.available_resources.grain += 10;
            })
          }
        })
      }
    });

    this.communication_service.getEndGame()
    .subscribe({
      next:(message)=>{
        sessionStorage.setItem('winner', message);
        this.game_object_service.endGame(this.room)
        .subscribe({
          next: () => {
            this.persistence_service.addStats({won: message, lost: this.player})
            .subscribe({
              next: () => {
                this.finnished_game = true;
                this.router.navigate(['/game_over']);
              }
            })
          }
        })
      }
    });

    this.communication_service.getSurrendered()
    .subscribe({
      next:(loser)=>{
        sessionStorage.setItem('winner', this.player);
        this.game_object_service.endGame(this.room)
        .subscribe({
          next: () => {
            this.persistence_service.addStats({won: this.player, lost: loser})
            .subscribe({
              next: () => {
                this.router.navigate(['/game_over']);
              }
            })
          }
        })
      }
    })

  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.unloadNotification);
    sessionStorage.removeItem('room_id');
  }

  getColor(value: string): string {
    switch (value) {
      case 'lake':
        return '#4472C4';
      case 'forest':
        return '#548235';
      case 'hills':
        return '#833C0C';
      case 'plains':
        return '#A9D08E';
      default:
        return '#9E9E9E';
    }
  }

  onCellLeftClick(row: number, col: number): void {
    if(this.selected_cell.x_coor != -1){
      this.removeYellowBorder();
    }

    if(this.possible_moves.length != 0){
      this.removeRedBorders();
    }

    this.selected_cell = {x_coor: row, y_coor: col};
    const cell = this.el.nativeElement.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
    if (cell) {
      this.renderer.setStyle(cell, 'border-color', 'yellow');
    }

    this.game_object_service.getPosition(row, col, this.room)
        .subscribe({
            next: (position) => {
              
              console.log(position);

              //Sta sve mozes da izgradis
              if(position.type === "" && ((this.left && col < this.terrain[0].length / 5) || (!this.left && col >= 4 * this.terrain[0].length / 5))){              
                this.game_object_service.whatCanBeBuilt(row, col, this.room)
                .subscribe({
                  next: (buildings) => {
                    buildings.gold_cost.unshift(this.gold);
                    this.buildings = buildings;
                    this.selected_x = row;
                    this.selected_y = col;
                    this.buildings_menu = true;
                  }
                })  
              }

              //Sta sve jedinica moze da uradi
              else if(position.owner === this.player && position.type === "unit"){
                let unit = this.player_units.find(u => u.x_coor === row && u.y_coor === col);
          
                if(unit && !unit.finished_turn){
                  this.game_object_service.unitTurnPossibilities({unit, room: this.room})
                  .subscribe({
                      next: (position_step) => {
                        console.log(position_step);
                        this.possible_moves = position_step;
                        position_step.forEach(pos => {
                          const cell = this.el.nativeElement.querySelector(`.row:nth-child(${pos.x_coor + 1}) .cell:nth-child(${pos.y_coor + 1})`);
                          if (cell) {
                            this.renderer.setStyle(cell, 'border-color', 'red');
                          }
                        });
                      }
                  })

                  if(unit.upgrade === "none")
                    this.add_upgrades_menu = true;

                  this.health = unit.health;
                  this.selected_menu = true;

                  this.selected_unit = unit;
                }
              }
              //Odabir upgradova za izuciti
              else if(position.owner === this.player && position.type === "city"){
                this.game_object_service.whatUpgradesExist()
                .subscribe({
                    next: (upgrades) => {
                      upgrades.upgrade_name.forEach((name, index) => {
                        if (!this.player_upgrades.some(upgrade => upgrade.name === name)) {
                          this.upgrades.upgrade_name.push(name);
                          this.upgrades.gold_cost.push(upgrades.gold_cost[index]);
                        }
                      });
                      this.health = this.player_city.health;
                      this.selected_menu = true;

                      this.upgrades_menu = true;
                    }
                })
              }

              //Odabir pravljenja jedinica
              else if(position.owner === this.player && position.type === "facility"){
                const facility = this.player_production_facilities.find(f => f.x_coor === row && f.y_coor === col);
                //Moras da vidis da li je levi ili desni igrac
                let new_col = col;
                if(this.left)
                  new_col++;
                else
                  new_col--;
                this.game_object_service.getPosition(row, new_col, this.room)
                .subscribe({
                    next: (position) => {
                      if(position.type === ""){
                        this.production_menu = true;
                        this.selected_x = row;
                        this.selected_y = col;
                        if(facility){
                          this.selected_facility = facility;
                          this.health = facility.health;
                          this.selected_menu = true;
                        }
                      }
                    }
                })
              }
            }
        })
  }


  onCellRightClick(row: number, col: number, event: MouseEvent) {
    event.preventDefault();
    const move = this.possible_moves.find(m => m.x_coor === row && m.y_coor === col);

    if(this.add_upgrades_menu)
      this.add_upgrades_menu = false;

    if(move){
      //attack
      if(move.type === "unit"){
        const defender = this.enemy_units.find(d => d.x_coor === row && d.y_coor === col);

        if(defender){
          this.game_object_service.attack({attacker: this.selected_unit, defender, room: this.room })
          .subscribe({
            next: (attack) => {
              if(attack.attacker.health > 0){
                if(attack.defender.health <= 0  && attack.attacker.range == 1){
                  this.removeIconFromCell(this.selected_unit.x_coor, this.selected_unit.y_coor);
                  this.displayIconAtCell(attack.attacker.x_coor, attack.defender.y_coor, attack.attacker.icon, this.left);
                }
                this.player_units[this.player_units.findIndex(unit => unit.id === attack.attacker.id)] = attack.attacker;
              }
              else {
                this.player_units.splice(this.player_units.findIndex(unit => unit.id === attack.attacker.id), 1);
                this.removeIconFromCell(attack.attacker.x_coor, attack.attacker.y_coor);
              }

              if(attack.defender.health > 0)
                this.enemy_units[this.enemy_units.findIndex(unit => unit.id === attack.defender.id)] = attack.defender;
              else {
                this.enemy_units.splice(this.enemy_units.findIndex(unit => unit.id === attack.defender.id), 1);
                this.removeIconFromCell(attack.defender.x_coor, attack.defender.y_coor);
              }

              console.log(this.player_units);
              console.log(this.enemy_units);

              this.removeRedBorders();
              this.removeYellowBorder();

              this.communication_service.sendAttack(this.room, attack);
            }
          })
        }
      }
      //destroy
      else if(move.type === "facility" || move.type === "resource"){
        const object = this.enemy_facilities.find(f => f.x_coor === row && f.y_coor === col);

        if(object){
          this.game_object_service.destroy({attacker: this.selected_unit, object, room: this.room})
          .subscribe({
            next: (destroy) => {
              if(destroy.object.health <= 0){
                this.removeIconFromCell(destroy.object.x_coor, destroy.object.y_coor);
                this.enemy_facilities.splice(this.enemy_facilities.findIndex(facility => facility.x_coor === destroy.object.x_coor && facility.y_coor === destroy.object.y_coor), 1);
                if( destroy.attacker.range == 1) {
                  this.removeIconFromCell(this.selected_unit.x_coor, this.selected_unit.y_coor);
                  this.displayIconAtCell(destroy.attacker.x_coor, destroy.attacker.y_coor, destroy.attacker.icon, this.left);
                }
              }
              else {
                this.enemy_facilities[this.enemy_facilities.findIndex(facility => facility.x_coor === destroy.object.x_coor && facility.y_coor === destroy.object.y_coor)] = destroy.object;
              }

              this.player_units[this.player_units.findIndex(unit => unit.id === destroy.attacker.id)] = destroy.attacker;

              this.removeRedBorders();
              this.removeYellowBorder();

              console.log(this.enemy_facilities);
              console.log(this.player_units);

              this.communication_service.sendDestroy(this.room, destroy);
            }
          })
        }
      }
      //destroy city
      else if(move.type === "city"){
        this.game_object_service.destroy({attacker: this.selected_unit, object: this.enemy_city, room: this.room})
        .subscribe({
          next: (destroy) => {
            if(destroy.object.health <= 0){
              this.removeIconFromCell(destroy.object.x_coor, destroy.object.y_coor);
              this.enemy_city = { x_coor: -1, y_coor: -1, health: 0, icon: ""};
              if( destroy.attacker.range == 1) {
                this.removeIconFromCell(this.selected_unit.x_coor, this.selected_unit.y_coor);
                this.displayIconAtCell(destroy.attacker.x_coor, destroy.attacker.y_coor, destroy.attacker.icon, this.left);
              }
            }
            else {
              this.enemy_city = destroy.object;
            }

            this.player_units[this.player_units.findIndex(unit => unit.id === destroy.attacker.id)] = destroy.attacker;

            this.removeRedBorders();
            this.removeYellowBorder();

            console.log(this.enemy_city);
            console.log(this.player_units);

            this.communication_service.sendDestroyCity(this.room, destroy);

            if(destroy.object.health <= 0){
              this.communication_service.sendEndGame(this.room, this.player);
              sessionStorage.setItem('winner', this.player);
              this.finnished_game = true;
              this.router.navigate(['/game_over']);
            }
          }
        })
      }
      //move
      else if(move.type === ""){
        this.game_object_service.move({unit: this.selected_unit, final_position: move, room: this.room})
        .subscribe({
          next: (unit) => {
            //1 Na osnovu id izbacis iz player_units taj unit i dodas ga opet
            const index = this.player_units.findIndex(u => u.id === unit.id);
            const old_unit = this.player_units[index];
            if (index !== -1) {
              this.player_units.splice(index, 1);
            }
            this.player_units.push(unit);
            //2 Skinemo ikonicu i postavimo novu
            this.removeIconFromCell(old_unit.x_coor, old_unit.y_coor);
            this.displayIconAtCell(unit.x_coor, unit.y_coor, unit.icon, this.left);
          
            //3
            this.removeRedBorders();
            this.removeYellowBorder();

          //4 posaljemo drugom igracu promenu
          this.communication_service.sendMove(this.room.toString(), unit);
        }
      })
    }
  }
}

  //Odavde pozivas proizvodnju objekta i cuvas ga na odgovarajucem mestu
  handleBuildingsMenu(selected_option: {building_name: string, gold_cost: number}) {
    this.buildings_menu = false;
    this.game_object_service.produceFacility(selected_option.building_name, this.selected_x, this.selected_y, this.room)
    .subscribe({
      next: (facility) => {
        if(this.game_service.isProductionFacility(facility))
          this.player_production_facilities.push(facility);
        else if(this.game_service.isResourceFacility(facility))
          this.player_resource_facilities.push(facility);
        this.displayIconAtCell(this.selected_x, this.selected_y, selected_option.building_name, this.left);
        this.selected_x = -1;
        this.selected_y = -1;
        this.gold -= selected_option.gold_cost;
        this.buildings = {building_names: [], gold_cost: []};
        this.communication_service.sendProduceFacility(this.room , facility);
        this.removeYellowBorder();
        console.log(this.player_resource_facilities);
      }
    })
  }

  //Odavde gasis meni za izgradnju objekata bez da bilo sta izaberes
  closeBuildingsMenu(){
    this.buildings_menu = false;
    this.selected_x = -1;
    this.selected_y = -1;
    this.buildings = {building_names: [], gold_cost: []};
    //this.removeYellowBorder();
  }

  //Odavde pozivas proizvodnju jedinica i cuvas je na odgovarajucem mestu
  handleProductionMenu(selected_option: {unit_type: string, unit_name: string, iron_cost: number, grain_cost: number}){
    let new_y = this.selected_y;
    if(this.left)
      new_y++;
    else
      new_y--;
    this.game_object_service.produceUnit(selected_option.unit_type, selected_option.unit_name, this.selected_x, new_y, this.room)
    .subscribe({
      next: (unit) => {
        this.player_units.push(unit);
        this.displayIconAtCell(unit.x_coor, unit.y_coor, selected_option.unit_type, this.left);
        this.selected_x = -1;
        this.selected_y = -1;
        this.available_resources.grain -= selected_option.grain_cost;
        this.available_resources.iron -= selected_option.iron_cost;
        this.selected_facility = {x_coor: -1, y_coor: -1, health: 0, icon: "", iron_cost: [], grain_cost: [], unit_name: [], type: ""};
        this.production_menu = false;
        this.communication_service.sendProduceUnit(this.room, unit);
        this.removeYellowBorder();
        console.log(unit);
      }
    })
  }

  //Odavde gasis meni za izgradnju jedinica bez da bilo sta izaberes
  closeProductionMenu(){
    this.production_menu = false;
    this.selected_x = -1;
    this.selected_y = -1;
    this.selected_facility = {x_coor: -1, y_coor: -1, health: 0, icon: "", iron_cost: [], grain_cost: [], unit_name: [], type: ""};
    //this.removeYellowBorder();
  }

  //Odavde pozivas izucavanje upgrade i cuvas ga na odgovarajucem mestu
  handleUpgradesMenu(option_selected :{upgrade_name: string, gold_cost: number}) {
    this.game_object_service.researchUpgrade(option_selected.upgrade_name)
    .subscribe({
      next: (upgrade) => {
        this.player_upgrades.push(upgrade);
        this.selected_x = -1;
        this.selected_y = -1;
        this.gold -= option_selected.gold_cost;
        this.upgrades = {upgrade_name: [], gold_cost: []};
        this.upgrades_menu = false;
        this.removeYellowBorder();
      }
    })
  }

  //Odavde gasis meni za upgrades bez da bilo sta izaberes
  closeUpgradesMenu() {
    this.upgrades_menu = false;
    this.selected_x = -1;
    this.selected_y = -1;
    this.upgrades = {upgrade_name: [], gold_cost: []};
    //this.removeYellowBorder();
  }

  //Odavde dodajes upgrade jedinici
  handleAddUpgradesMenu(option_selected :Upgrade) {
    this.selected_unit.upgrade = option_selected.name;
    this.selected_unit.finished_turn = true;
    this.gold -= option_selected.cost;
    this.selected_x = -1;
    this.selected_y = -1;
    this.add_upgrades_menu = false;
    this.removeYellowBorder();
    this.removeRedBorders();

  }
  
  //Odavde gasis meni za upgrades bez da bilo sta izaberes
  closeAddUpgradesMenu() {
    this.add_upgrades_menu = false;
    this.selected_x = -1;
    this.selected_y = -1;
    //this.removeYellowBorder();
  }

    //Odavde gasis meni za upgrades bez da bilo sta izaberes
  closeSelectedMenu() {
    this.selected_menu = false;
    this.health = 0;
    //this.removeYellowBorder();
  }

  displayIconAtCell(row: number, col: number, iconType: string, facing: boolean) {
    const cell = this.el.nativeElement.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
    if (cell) {
      const iconElement = this.renderer.createElement('img');
      this.renderer.setAttribute(iconElement, 'src', `assets/icons/${iconType}-icon.png`);
      this.renderer.addClass(iconElement, 'icon');

      //Ako je levi igrac facing ce biti true
      if (!facing) {
        this.renderer.setStyle(iconElement, 'transform', 'rotateY(180deg)');
      }

      this.renderer.appendChild(cell, iconElement);
    }
  }

  removeIconFromCell(row: number, col: number) {
    const cell = this.el.nativeElement.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
    
    if (cell) {
      // Find the icon element (you can use a specific class if you've added one)
      const icon = cell.querySelector('.icon'); // or a specific class, e.g., '.my-icon-class'
      
      if (icon) {
        this.renderer.removeChild(cell, icon); // Remove the icon from the cell
      }
    }
  }

  onNextTurnClick() {
    this.my_turn = false;
    this.removeRedBorders();
    this.removeYellowBorder();
    this.communication_service.sendNextTurn(this.room);
  }

  onSurrenderClick() {
    //this.surrendered = true;
    this.communication_service.sendSurrendered(this.room, this.player);
    this.router.navigate(['/home']);
  }
  
  removeRedBorders() {
    //3 Sklonimo crvene bordere
    this.possible_moves.forEach(move => {
      const cell = this.el.nativeElement.querySelector(`.row:nth-child(${move.x_coor + 1}) .cell:nth-child(${move.y_coor + 1})`);
      if (cell) {
        this.renderer.setStyle(cell, 'border-color', ''); // Reset to default color
      }
    })

    //4 sklonimo selected_unit i possible_moves
    this.possible_moves = [];
    this.selected_unit = {id: 0, x_coor: -1, y_coor: -1, health: 0, strenght: 0, range: 0, steps: 0, steps_left: 0, upgrade: "", finished_turn: true, icon: ""};
  }

  removeYellowBorder() {
    //3 Sklonimo zuti border
    const cell = this.el.nativeElement.querySelector(`.row:nth-child(${this.selected_cell.x_coor + 1}) .cell:nth-child(${this.selected_cell.y_coor + 1})`);
    if (cell) {
      this.renderer.setStyle(cell, 'border-color', ''); // Reset to default color
    }

    //4 sklonimo selected_cell
    this.selected_cell = {x_coor: -1, y_coor: -1};
  }

  unloadNotification(event: BeforeUnloadEvent): void {
    //sessionStorage.removeItem('room_id');
    //this.communication_service.sendSurrendered(this.room, this.player);
    const confirmationMessage = 'Are you sure you want to leave? Changes you made may not be saved.';
    
    // Standard way to prompt for beforeunload
    event.returnValue = confirmationMessage; // Chrome requires this to be set
  }
}
