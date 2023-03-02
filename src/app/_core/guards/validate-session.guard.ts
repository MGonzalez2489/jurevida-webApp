import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class ValidateSessionGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {}

  canActivate(): boolean {
    const token = this.sessionService.getSessionToken();
    if (!token || token === '') {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }
}
