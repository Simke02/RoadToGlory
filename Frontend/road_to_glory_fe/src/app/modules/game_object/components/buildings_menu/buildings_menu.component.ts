import { Component, ElementRef, EventEmitter, Input, Output, HostListener, OnInit } from '@angular/core';
import { BuildingsDto } from 'src/app/common/models/dto/buildings.dto';

@Component({
  selector: 'app-buildings-menu',
  templateUrl: './buildings_menu.component.html',
  styleUrls: ['./buildings_menu.component.css']
})
export class BuildingsMenuComponent implements OnInit {
  @Input() buildings: BuildingsDto = {building_names: [], gold_cost: []};
  @Output() closeMenu = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<{building_name: string, gold_cost: number}>()
  available_gold: number = 0;
  buildingsData: { building_name: string; gold_cost: number }[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    
    let gold = this.buildings.gold_cost.shift();
    if(gold){
      this.available_gold = gold;
    }

    this.buildingsData = this.buildings.building_names.map((building_name, index) => ({
      building_name,
      gold_cost: this.buildings.gold_cost[index]
    }));
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (!this.el.nativeElement.contains(target)) {
      this.closeMenu.emit();
    }
  }

  selectBuilding(building: {building_name: string, gold_cost: number}) {
      this.optionSelected.emit(building);
  }
}
