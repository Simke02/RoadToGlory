import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  terrain: string[][] = [];

  constructor(private game_service: GameService) {}

  ngOnInit(): void {
      this.game_service.getTerrain()
      .subscribe({
        next: (terrain)=>{
          this.terrain = terrain;
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
        return '#9E9E9E'; // Default color for undefined terrain
    }
  }

  onCellClick(row: number, col: number): void {
    console.log(`Cell clicked at (${row}, ${col})`);
    // Add logic here, e.g., toggling the cell’s value
  }
}
