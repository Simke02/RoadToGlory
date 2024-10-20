import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/modules/communication/services/communication.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(
    private communication_service: CommunicationService,
    private readonly router:Router
  ){}
  ngOnInit(): void {

    //ovde ide ono za bazu sto smo pricali
    this.communication_service.joinRoom("GameID");

    this.communication_service.getJoin()
      .subscribe({
        next:(message)=>{
          console.log(message);
          
          this.router.navigate(['']);
        }
      });
  }

  

}
