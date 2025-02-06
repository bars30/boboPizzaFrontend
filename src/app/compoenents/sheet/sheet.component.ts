import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.css'
})
export class SheetComponent {
  @Input() isOpen: boolean = false; 
  @Output() closeSheet = new EventEmitter<void>(); 

  close() {
    this.closeSheet.emit(); 
  }
}
