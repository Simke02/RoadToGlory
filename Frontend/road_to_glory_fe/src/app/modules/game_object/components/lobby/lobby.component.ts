import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/modules/communication/services/communication.service';
import { GameObjectService } from '../../services/game_object.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {


  constructor(
    private communication_service: CommunicationService,
    private readonly router: Router,
    private game_object_service: GameObjectService
  ){}
  
  ngOnInit(): void {

    window.addEventListener('beforeunload', this.unloadNotification);

    //ovde ide ono za bazu sto smo pricali
    
    const player = sessionStorage.getItem('username')!;
    if(player){
      console.log(player);
      this.communication_service.joinRoom();
      this.game_object_service.addPlayer(player.toString())
      .subscribe();    
    }

    this.communication_service.getJoin()
      .subscribe({
        next:(room)=>{
          sessionStorage.setItem("room_id", room);
          this.router.navigate(['/game']);
        }
      });
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.unloadNotification);
  }

  unloadNotification(event: BeforeUnloadEvent): void {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token');
    const confirmationMessage = 'Are you sure you want to leave? Changes you made may not be saved.';
    
    // Standard way to prompt for beforeunload
    event.returnValue = confirmationMessage; // Chrome requires this to be set
  }

}
