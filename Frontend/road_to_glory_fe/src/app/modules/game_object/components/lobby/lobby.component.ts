import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/modules/communication/services/communication.service';
import { GameObjectService } from '../../services/game_object.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {


  constructor(
    private communication_service: CommunicationService,
    private readonly router: Router,
    private game_object_service: GameObjectService
  ){}
  
  ngOnInit(): void {

    

    this.communication_service.joinRoom();
    //ovde ide ono za bazu sto smo pricali

    const player = sessionStorage.getItem('username')!;
    this.game_object_service.addPlayer(player)
    .subscribe();    

    this.communication_service.getJoin()
      .subscribe({
        next:(room)=>{
          sessionStorage.setItem("room_id", room);
          this.router.navigate(['/game']);
        }
      });
  }

  

}
