import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CommunicationService } from 'src/app/modules/communication/services/communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(
    private router: Router,
    private auth_service: AuthService
  ) {}

  navigateToLobby() {
    this.router.navigate(['/lobby']);
  }

  navigateToStats() {
    this.router.navigate(['/stats']);
  }

  onLogOut() {
    this.auth_service.logout()
    this.router.navigate(['']);
  }
}
