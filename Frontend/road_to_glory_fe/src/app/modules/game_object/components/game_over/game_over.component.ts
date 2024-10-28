import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/modules/communication/services/communication.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game_over.component.html',
  styleUrls: ['./game_over.component.css']
})
export class GameOverComponent implements OnInit {
  winner: boolean = false;
  winner_name: string = "";
  player: string = "";

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  
    this.winner_name = sessionStorage.getItem('winner')!;
    this.player = sessionStorage.getItem('username')!;

    if(this.winner_name === this.player)
      this.winner = true;
    else
      this.winner = false;
  }

  goToHome() {
    sessionStorage.removeItem('winner');
    this.router.navigate(['/home']);
  }

  playAgain() {
    sessionStorage.removeItem('winner');
    this.router.navigate(['/lobby']);
  }
}
