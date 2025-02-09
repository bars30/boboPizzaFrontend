import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [CommonModule]
})
export class ToastComponent {
  // @Input() message = ''; // Сообщение уведомления
  // @Input() type: 'success' | 'error' | 'info' = 'info'; // Тип уведомления

  // removeToast() {
  //   this.message = ''; // Скрыть сообщение
  // }
  @Input() toasts: { id: number, message: string, type: 'success' | 'error' | 'info' }[] = [];

  // removeToast(toastId: number) {
  //   this.toasts = this.toasts.filter(toast => toast.id !== toastId);
  // }
  removeToast(toastId: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== toastId);
  }
  
}
