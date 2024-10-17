import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommunicationService } from 'src/app/modules/communication/services/communication.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  terrain: string[][] = [];

  constructor(
    private game_service: GameService,
    private communication_service: CommunicationService, 
  ) {
    
  }

  ngOnInit(): void {
      this.game_service.getTerrain()
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
        return '#9E9E9E'; // Default color for undefined terrain
    }
  }

  onCellClick(row: number, col: number): void {
    console.log(`Cell clicked at (${row}, ${col})`);
    
    this.communication_service.sendMessage(`Cell clicked at (${row}, ${col})`);
    // Add logic here, e.g., toggling the cell’s value
  }
}
