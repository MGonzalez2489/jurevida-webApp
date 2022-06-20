import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SessionService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidateSessionGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.sessionService.getSessionToken();
    if (!token || token === '') {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }
}
