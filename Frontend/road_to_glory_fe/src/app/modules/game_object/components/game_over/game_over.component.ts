import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-over',
  templateUrl: './game_over.component.html',
  styleUrls: ['./game_over.component.css']
})
export class GameOverComponent implements OnInit {
  winner: boolean = false;
  winner_name: string = "";
  player: string = "";

  ngOnInit(): void {
    this.winner_name = sessionStorage.getItem('winner')!;
    this.player = sessionStorage.getItem('username')!;

    if(this.winner_name === this.player)
      this.winner = true;
    else
      this.winner = false;
  }
}
