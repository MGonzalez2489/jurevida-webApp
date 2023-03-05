import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { GLOBAL } from '@global/globals';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackNotification$: Subject<string> = new Subject();
  private sbConfig: MatSnackBarConfig;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private snacBarAutoHide = GLOBAL.NOTIFICATION_DURATION;

  constructor(private snackBar: MatSnackBar) {
    this.sbConfig = new MatSnackBarConfig();
    this.sbConfig.duration = parseInt(this.snacBarAutoHide, 100);
    this.sbConfig.horizontalPosition = this.horizontalPosition;
    this.showMessage();
  }

  private showMessage() {
    this.snackNotification$.subscribe((data) => {
      this.snackBar.open(`${data}`, 'cerrar', this.sbConfig);
    });
  }
  openMessage(message: string) {
    this.snackNotification$.next(message);
  }
  closeMessage() {
    this.snackBar.dismiss();
  }
}
