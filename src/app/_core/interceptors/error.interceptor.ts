import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { iError } from '@shared/interfaces';
import { NotificationService } from '@core/services';
import { environment } from '@environment/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let jurevidaError: iError = {
          status: -1,
          error: '',
          message: ''
        };

        if (error.error instanceof ErrorEvent) {
          // client-side error

          jurevidaError.error = `${error.error.message}`;
        } else {
          // server-side error
          jurevidaError.error = error.error instanceof Object ? error.statusText : error.error;
          jurevidaError.status = error.status;
          jurevidaError.message = error.message;
        }

        if (jurevidaError.error === 'Unknown Error') {
          jurevidaError.error = 'Ups! Algo salio mal.';
        }

        if (jurevidaError.status !== 401) {
          this.notificationService.openMessage(jurevidaError.error);
        }

        if (!environment.production) {
          console.log('Request Error', jurevidaError);
        }
        return throwError(jurevidaError);
      })
    );
  }
}
