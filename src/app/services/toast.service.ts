import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private defaultDuration = environment.ToastDuration;

    constructor(
        private snackbar: MatSnackBar
    ) { }

    success(translationKey: string = 'general.success_save', params = {}, duration?: number) {
        this.show(translationKey, params, duration);
    }

    error(translationKey: string = 'general.errors.server_error', params = {}, duration?: number) {
        return this.showError(translationKey, params, duration);
    }

    warning(translationKey: string = 'general.errors.warning', params = {}, duration?: number) {
        return this.showWarning(translationKey, params, duration);
    }

    info(translationKey: string = 'general.info', params = {}, duration?: number) {
        return this.showInfo(translationKey, params, duration);
    }

    private show(message: string, params = {}, duration?: number) {
        this.snackbar.open(message, undefined, {
            duration: duration || this.defaultDuration,
            panelClass: ['green-snackbar'],
        });

    }

    private showError(message: string, params = {}, duration?: number) {
        this.snackbar.open(message, undefined, {
            duration: duration || this.defaultDuration,
            panelClass: ['red-snackbar'],
        });

    }
    private showWarning(message: string, params = {}, duration?: number) {
        this.snackbar.open(message, undefined, {
            duration: duration || this.defaultDuration,
            panelClass: ['yellow-snackbar'],
        });
    }

    private showInfo(message: string, params = {}, duration?: number) {
        this.snackbar.open(message, undefined, {
            duration: duration || this.defaultDuration,
            panelClass: ['blue-snackbar'],
        });
    }

}
