import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
import { map } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private player: string="";
  private room:string="0";
  terrain: string[][] = [];
  private player_units: Unit[] = [];
  private enemy_units: Unit[] = [];
  private player_resource_facilities: ResourceFacility[] = [];
  private player_production_facilities: Facility[] = [];
  private enemy_facilities: BasicFacility[] = [];
  player_upgrades: Upgrade[] = []; //Koje upgradove ima korisnik i koliko kosta da se postave na jedinicu
  gold: number = 500;//50;
  available_resources: {grain: number, iron: number} = {grain: 1000, iron: 1000};
  buildings_menu: boolean = false;
  production_menu: boolean = false;
  upgrades_menu: boolean = false;
  add_upgrades_menu: boolean = false;
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

  authenticated$ = this.current_user_service
    .getCurrentUser$()
    .pipe(map((user) => !!user));


  constructor(
    private game_object_service: GameObjectService,
    private communication_service: CommunicationService,
    private game_service: GameService,
    private renderer: Renderer2,
    private el: ElementRef,
    private current_user_service:CurrentUserService
  ) {
    const potential_room = sessionStorage.getItem("room_id");
    if(potential_room){
      this.room = JSON.parse(potential_room).toString();
    }

  }

  ngOnInit(): void {
      this.game_object_service.getTerrain()
      .subscribe({
        next: (terrain)=>{
          this.terrain = terrain;
        }
      })
      
      this.communication_service.getLeave()
      .subscribe({
        next:(message)=>{
          console.log(message);
        }
      });


      this.communication_service.getAttack()
      .subscribe({
        next: (message)=>{
          console.log(message);
        }
      });

      this.communication_service.getDestroy()
      .subscribe({
        next:(message)=>{
          console.log(message);
        }
      });

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
            this.displayIconAtCell(unit.x_coor, unit.y_coor, unit.icon);
          }
        }
      });

      this.communication_service.getProduceUnit()
      .subscribe({
        next:(unit)=>{
          if(this.game_service.isUnit(unit)){
            this.enemy_units.push(unit);
            this.displayIconAtCell(unit.x_coor, unit.y_coor, unit.icon);
          }
        }
      });

      this.communication_service.getProduceFacility()
      .subscribe({
        next:(facility)=>{
          if(this.game_service.isBasicFacility(facility)){
            this.enemy_facilities.push(facility);
            this.displayIconAtCell(facility.x_coor, facility.y_coor, facility.icon);
          }
        }
      });

      //Da za prvi potez ne dodaje gold za ovog koji drugi igra
      this.communication_service.getNextTurn()
      .subscribe({
        next:()=>{
          console.log('%d %d %d', this.gold, this.available_resources.iron, this.available_resources.grain);
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
          console.log('%d %d %d', this.gold, this.available_resources.iron, this.available_resources.grain);
        }
      });

      this.communication_service.getEndGame()
      .subscribe({
        next:(message)=>{
          console.log(message);
        }
      });


      this.communication_service.getCreateGame()
      .subscribe({
        next: (message)=>{
          console.log(message);
        }
      });
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

    this.selected_cell = {x_coor: row, y_coor: col};
    const cell = this.el.nativeElement.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
    if (cell) {
      this.renderer.setStyle(cell, 'border-color', 'yellow');
    }

    if(this.possible_moves.length != 0){
      this.removeRedBorders();
    }

    this.game_object_service.getPosition(row, col)
        .subscribe({
            next: (position) => {
              
              console.log(position);

              //Moras da izmenis da proverava da li je u njegovom delu mape!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              //Sta sve mozes da izgradis
              if(position.type === ""){              
                this.game_object_service.whatCanBeBuilt(row, col)
                .subscribe({
                  next: (buildings) => {
                    //treba da se pozove komponenta koja ce to da sadrzi
                    this.buildings_menu = true;
                    buildings.gold_cost.unshift(this.gold);
                    this.buildings = buildings;
                    this.selected_x = row;
                    this.selected_y = col;
                  }
                })  
              }

              //Sta sve jedinica moze da uradi
              //Moras da izmenis da proverava username igraca!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              else if(position.owner === "andrija" && position.type === "unit"){
                let unit = this.player_units.find(u => u.x_coor === row && u.y_coor === col);
          
                if(unit && !unit.finished_turn){
                  this.game_object_service.unitTurnPossibilities(unit)
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

                  this.selected_unit = unit;
                }
              }
              //Odabir upgradova za izuciti
              //Moras da izmenis da proverava username igraca!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              else if(position.owner === "andrija" && position.type === "city"){
                this.game_object_service.whatUpgradesExist()
                .subscribe({
                    next: (upgrades) => {
                      //let filteredUpgrades: UpgradesDto = {upgrade_name: [], gold_cost: []};
                      upgrades.upgrade_name.forEach((name, index) => {
                        // Only add items to filteredUpgrades if the name is not in player_upgrades
                        if (!this.player_upgrades.some(upgrade => upgrade.name === name)) {
                          this.upgrades.upgrade_name.push(name);
                          this.upgrades.gold_cost.push(upgrades.gold_cost[index]);
                        }
                      });
                      //treba da se pozove komponenta koja ce to da sadrzi
                      //Treba da prodjes kroz sve koje ti imas i da ih izbacis iz ponude
                      this.upgrades_menu = true;
                      //Posalji koliko ima para
                    }
                })
              }

              //Odabir pravljenja jedinica
              //Moras da izmenis da proverava username igraca!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              else if(position.owner === "andrija" && position.type === "facility"){
                const facility = this.player_production_facilities.find(f => f.x_coor === row && f.y_coor === col);
                //Moras da vidis da li je levi ili desni igrac
                this.game_object_service.getPosition(row, col + 1)
                .subscribe({
                    next: (position) => {
                      if(position.type === ""){
                        //Treba da se prikaze u nekoj komponenti sta moze da se proizvede tu
                        this.production_menu = true;
                        this.selected_x = row;
                        this.selected_y = col;
                        if(facility)
                          this.selected_facility = facility;
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
      //Mora da se proveri sta je na poziciji i da se na osnovu toga zove attack, destroy ili move

      //attack

      //destroy

      //move
      this.game_object_service.move({unit: this.selected_unit, final_position: move})
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
          this.displayIconAtCell(unit.x_coor, unit.y_coor, unit.icon);
          
          //3
          this.removeRedBorders();
          this.removeYellowBorder();

          //4 posaljemo drugom igracu promenu
          this.communication_service.sendMove(this.room.toString(), unit);
        }
      })
    }
  }

  //Odavde pozivas proizvodnju objekta i cuvas ga na odgovarajucem mestu
  handleBuildingsMenu(selected_option: {building_name: string, gold_cost: number}) {
    this.buildings_menu = false;
    this.game_object_service.produceFacility(selected_option.building_name, this.selected_x, this.selected_y)
    .subscribe({
      next: (facility) => {
        if(this.game_service.isProductionFacility(facility))
          this.player_production_facilities.push(facility);
        else if(this.game_service.isResourceFacility(facility))
          this.player_resource_facilities.push(facility);
        this.displayIconAtCell(this.selected_x, this.selected_y, selected_option.building_name);
        this.selected_x = -1;
        this.selected_y = -1;
        this.gold -= selected_option.gold_cost;
        this.buildings = {building_names: [], gold_cost: []};
        this.communication_service.sendProduceFacility(this.room , facility);
        this.removeYellowBorder();
      }
    })
  }

  //Odavde gasis meni za izgradnju objekata bez da bilo sta izaberes
  closeBuildingsMenu(){
    this.buildings_menu = false;
    this.selected_x = -1;
    this.selected_y = -1;
    this.buildings = {building_names: [], gold_cost: []};
    this.removeYellowBorder();
  }

  //Odavde pozivas proizvodnju jedinica i cuvas je na odgovarajucem mestu
  handleProductionMenu(selected_option: {unit_type: string, unit_name: string, iron_cost: number, grain_cost: number}){
    this.game_object_service.produceUnit(selected_option.unit_type, selected_option.unit_name, this.selected_x, this.selected_y + 1)
    .subscribe({
      next: (unit) => {
        this.player_units.push(unit);
        this.displayIconAtCell(unit.x_coor, unit.y_coor, selected_option.unit_type);
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
    this.removeYellowBorder();
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
    this.removeYellowBorder();
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
    this.removeYellowBorder();
  }

  displayIconAtCell(row: number, col: number, iconType: string) {
    const cell = this.el.nativeElement.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
    if (cell) {
      const iconElement = this.renderer.createElement('img');
      this.renderer.setAttribute(iconElement, 'src', `assets/icons/${iconType}-icon.png`);
      this.renderer.addClass(iconElement, 'icon');
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
}
