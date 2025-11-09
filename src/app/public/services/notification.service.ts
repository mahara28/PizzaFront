// notification.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.show(message, 'success');
  }

  showError(message: string): void {
    this.show(message, 'error');
  }

  showInfo(message: string): void {
    this.show(message, 'info');
  }

  private show(message: string, type: 'success' | 'error' | 'info'): void {
    const config = {
      duration: 3000,
      verticalPosition: 'top' as any,
      horizontalPosition: 'center' as any,
      panelClass: [`${type}-snackbar`, 'top-snackbar']
    };

    this.snackBar.open(message, undefined, config);
  }
} 