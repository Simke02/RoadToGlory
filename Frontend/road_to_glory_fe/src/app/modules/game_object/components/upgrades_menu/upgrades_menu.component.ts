import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { UpgradesDto } from 'src/app/common/models/dto/upgrades.dto';

@Component({
  selector: 'app-upgrades-menu',
  templateUrl: './upgrades_menu.component.html',
  styleUrls: ['./upgrades_menu.component.css']
})
export class UpgradesMenuComponent implements OnInit{
  @Input() upgrades: UpgradesDto = {upgrade_name: [], gold_cost: []};
  @Input() gold: number = 0;
  @Output() closeMenu = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<{upgrade_name: string, gold_cost: number}>()
  
  upgradesData: {upgrade_name: string, gold_cost: number}[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.upgradesData = this.upgrades.upgrade_name.map((upgrade, index) => ({
      upgrade_name: upgrade,
      gold_cost: this.upgrades.gold_cost[index]
    }));
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (!this.el.nativeElement.contains(target)) {
      this.closeMenu.emit();
    }
  }

  selectBuilding(upgrade: {upgrade_name: string, gold_cost: number}) {
    this.optionSelected.emit(upgrade);
}
}
