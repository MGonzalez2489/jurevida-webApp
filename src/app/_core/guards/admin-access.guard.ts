import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}
  canActivate(): boolean {
    const user = this.sessionService.getSessionUser();
    if (user!.administrator) {
      return true;
    }
  this.sessionService.noSessionExit();
    this.router.navigate(['/auth']);
    return false;
  }
}
