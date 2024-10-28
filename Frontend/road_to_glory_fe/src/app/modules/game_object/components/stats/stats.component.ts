import { Component, OnInit } from '@angular/core';
import { PersistenceService } from '../../services/persistence.service';
import { Stats } from 'src/app/common/models/stats/stats.model';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/modules/communication/services/communication.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  my_stats: Stats = {username: "", won: 0, lost: 0};
  top_stats: Stats[] = [];

  constructor(
    private persistence_service: PersistenceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = sessionStorage.getItem('username')!;
    console.log(username);
    this.persistence_service.userStats(username.toString())
    .subscribe({
      next: (stats) => {
        this.my_stats = stats;
      }
    })

    this.persistence_service.bestStats()
    .subscribe({
      next: (stats) => {
        this.top_stats = stats;
      }
    })
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
