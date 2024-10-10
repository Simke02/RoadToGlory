import { Component, OnInit } from '@angular/core';
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

  constructor(
    private game_object_service: GameObjectService,
    private communication_service: CommunicationService,
    private game_service: GameService 
  ) {
    
  }

  ngOnInit(): void {
      this.game_object_service.getTerrain()
      .subscribe({
        next: (terrain)=>{
          this.terrain = terrain;
        }
      })
      this.communication_service.joinRoom("GameID");

      this.communication_service.getMessage()
      .subscribe({
        next: (message)=>{
          console.log(message);
        }
      })
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
              //Moras da izmenis da proverava da li je u njegovom delu mape!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              if(position.type === ""){              
                this.game_object_service.whatCanBeBuilt(row, col)
                .subscribe({
                  next: (buildings) => {
                    console.log(buildings);
                    //treba da se pozove komponenta koja ce to da sadrzi
                  }
                })  
              }

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
              //Moras da izmenis da proverava username igraca!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              else if(position.owner === "andrija" && position.type === "city"){
                this.game_object_service.whatUpgradesExist()
                .subscribe({
                    next: (upgrades) => {
                      console.log(upgrades);
                      //treba da se pozove komponenta koja ce to da sadrzi
                      //Treba da prodjes kroz sve koje ti imas i da ih izbacis iz ponude
                    }
                })
              }

              //Moras da izmenis da proverava username igraca!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              else if(position.owner === "andrija" && position.type === "facility"){
                const facility = this.player_production_facilities.find(f => f.x_coor === row && f.y_coor === col);
                //Moras da vidis da li je levi ili desni igrac
                this.game_object_service.getPosition(row, col + 1)
                .subscribe({
                    next: (position) => {
                      if(position.type === ""){
                        //Treba da se prikaze u nekoj komponenti sta moze da se proizvede tu
                      }
                    }
                })
              }
            }
        })
  }
}
