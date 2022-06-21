import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { SessionService } from '@core/services';
import { environment } from '@environment/environment';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionService.getSessionToken();
    const isApiUrl = request.url.startsWith(environment.baseUrl);
    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(catchError((x) => this.handleAuthError(x)));
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      alert('La session finalizo, por favor inicia sesion de nuevo para continuar');
      this.sessionService.deleteSession();

      this.router.navigateByUrl(`/auth`);
      return of(err.message);
    }
    return throwError(err);
  }
}
