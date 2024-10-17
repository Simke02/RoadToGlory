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

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  terrain: string[][] = [];
  private player_units: Unit[] = [];
  private enemy_units: Unit[] = [];
  private player_resource_facilities: ResourceFacility[] = [];
  private player_production_facilities: Facility[] = [];
  private enemy_facilities: BasicFacility[] = [];
  private player_upgrades: Upgrade[] = []; //Koje upgradove ima korisnik i koliko kosta da se postave na jedinicu
  gold: number = 500;//50;
  available_resources: {grain: number, iron: number} = {grain: 1000, iron: 1000};
  buildings_menu: boolean = false;
  production_menu: boolean = false;
  upgrades_menu: boolean = false;
  buildings: BuildingsDto = {building_names: [], gold_cost: []};
  //production: ProductionDto = {iron_cost: [], grain_cost: [], unit_name: []};
  upgrades: UpgradesDto = {upgrade_name: [], gold_cost: []};
  private selected_x: number = -1;
  private selected_y: number = -1;
  selected_facility: Facility = {x_coor: -1, y_coor: -1, health: 0, iron_cost: [], grain_cost: [], unit_name: [], type: ""};


  constructor(
    private game_object_service: GameObjectService,
    private communication_service: CommunicationService,
    private game_service: GameService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    
  }

  ngOnInit(): void {
      this.game_object_service.getTerrain()
      .subscribe({
        next: (terrain)=>{
          this.terrain = terrain;
        }
      })
      //ovde treba da se generise id za game i da kontaktira bazu
      this.communication_service.joinRoom("GameID");

      this.communication_service.getJoin()
      .subscribe({
        next:(message)=>{
          console.log(message);
        }
      });

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
        next:(message)=>{
          console.log(message);
        }
      });

      this.communication_service.getProduceUnit()
      .subscribe({
        next:(message)=>{
          console.log(message);
        }
      });

      this.communication_service.getProduceFacility()
      .subscribe({
        next:(message)=>{
          console.log(message);
        }
      });

      this.communication_service.getNextTurn()
      .subscribe({
        next:(message)=>{
          console.log(message);
        }
      });

      this.communication_service.getEndGame()
      .subscribe({
        next:(message)=>{
          console.log(message);
        }
      });


      this.communication_service.getMessage()
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
    console.log(`Cell clicked at (${row}, ${col})`);
    
    this.communication_service.sendMessage("GameID", `Cell clicked at (${row}, ${col})`);

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
                    console.log(buildings);
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
          
                if(unit){
                  this.game_object_service.unitTurnPossibilities(unit)
                  .subscribe({
                      next: (position_step) => {
                        console.log(position_step);
                        //treba da se pozove komponenta koja ce to da sadrzi
                      }
                  })

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
                      console.log(this.upgrades);
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

  //Odavde pozivas proizvodnju objekta i cuvas ga na odgovarajucem mestu
  handleBuildingsMenu(selected_option: {building_name: string, gold_cost: number}) {
    this.buildings_menu = false;
    console.log(selected_option);
    this.game_object_service.produceFacility(selected_option.building_name, this.selected_x, this.selected_y)
    .subscribe({
      next: (facility) => {
        console.log(facility);
        if(this.game_service.isProductionFacility(facility))
          this.player_production_facilities.push(facility);
        else if(this.game_service.isResourceFacility(facility))
          this.player_resource_facilities.push(facility);
        this.displayIconAtCell(this.selected_x, this.selected_y, selected_option.building_name);
        this.selected_x = -1;
        this.selected_y = -1;
        this.gold -= selected_option.gold_cost;
        this.buildings = {building_names: [], gold_cost: []};
        //Moras da posaljes protivniku taj facility
      }
    })

    console.log(selected_option);
  }

  //Odavde gasis meni za izgradnju objekata bez da bilo sta izaberes
  closeBuildingsMenu(){
    this.buildings_menu = false;
    this.selected_x = -1;
    this.selected_y = -1;
    this.buildings = {building_names: [], gold_cost: []};
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
        this.selected_facility = {x_coor: -1, y_coor: -1, health: 0, iron_cost: [], grain_cost: [], unit_name: [], type: ""};
        this.production_menu = false;
        //Moras da posaljes protivniku taj unit
      }
    })
  }

  //Odavde gasis meni za izgradnju jedinica bez da bilo sta izaberes
  closeProductionMenu(){
    this.production_menu = false;
    this.selected_x = -1;
    this.selected_y = -1;
    this.selected_facility = {x_coor: -1, y_coor: -1, health: 0, iron_cost: [], grain_cost: [], unit_name: [], type: ""};
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
      }
    })
  }

  //Odavde gasis meni za upgrades bez da bilo sta izaberes
  closeUpgradesMenu() {
    this.upgrades_menu = false;
    this.selected_x = -1;
    this.selected_y = -1;
    this.upgrades = {upgrade_name: [], gold_cost: []};
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
}
