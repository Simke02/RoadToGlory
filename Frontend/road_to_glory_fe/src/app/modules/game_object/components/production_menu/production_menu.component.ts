import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Facility } from 'src/app/common/models/facility/facility.model';

@Component({
  selector: 'app-production-menu',
  templateUrl: './production_menu.component.html',
  styleUrls: ['./production_menu.component.css']
})
export class ProductionMenuComponent implements OnInit{

  @Input() facility: Facility = {x_coor: -1, y_coor: -1, health: 0, iron_cost: [], grain_cost: [], unit_name: [], type: ""};
  @Input() available_resources: {iron: number, grain: number} = {iron: 0, grain: 0};
  @Output() closeMenu = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<{unit_type: string, unit_name: string, iron_cost: number, grain_cost: number}>()
  //Ovo sluzi za prikaz
  unitsData: { unit_name: string, iron_cost: number, grain_cost: number }[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.unitsData = this.facility.unit_name.map((unit, index) => ({
      unit_name: unit,
      iron_cost: this.facility.iron_cost[index],
      grain_cost: this.facility.grain_cost[index]
    }));
    console.log(this.unitsData);
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (!this.el.nativeElement.contains(target)) {
      this.closeMenu.emit();
    }
  }

  selectBuilding(unit: { unit_name: string, iron_cost: number, grain_cost: number}) {
    this.optionSelected.emit({unit_type: this.facility.type, unit_name: unit.unit_name, iron_cost: unit.iron_cost, grain_cost: unit.grain_cost});
}
}
