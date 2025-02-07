import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [CommonModule]
})
export class ToastComponent {
  @Input() message = ''; // Сообщение уведомления
  @Input() type: 'success' | 'error' | 'info' = 'info'; // Тип уведомления

  removeToast() {
    this.message = ''; // Скрыть сообщение
  }
}
