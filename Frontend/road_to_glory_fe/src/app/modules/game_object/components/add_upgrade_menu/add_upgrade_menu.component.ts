import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Upgrade } from 'src/app/common/models/upgrade/upgrade.model';

@Component({
  selector: 'app-add-upgrade-menu',
  templateUrl: './add_upgrade_menu.component.html',
  styleUrls: ['./add_upgrade_menu.component.css']
})
export class AddUpgradeMenuComponent {
  @Input() upgrades: Upgrade[] = [];
  @Input() gold: number = 0;
  @Output() closeMenu = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<Upgrade>()

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (!this.el.nativeElement.contains(target)) {
      this.closeMenu.emit();
    }
  }

  selectUpgrade(upgrade: Upgrade) {
      this.optionSelected.emit(upgrade);
  }

}
