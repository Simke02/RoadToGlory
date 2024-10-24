import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selected-menu',
  templateUrl: './selected_menu.component.html',
  styleUrls: ['./selected_menu.component.css']
})
export class SelectedMenuComponent {
  @Input() health: number = 0;
  @Output() closeMenu = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (!this.el.nativeElement.contains(target)) {
      this.closeMenu.emit();
    }
  }
}
