import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '@core/services';

@Injectable()
export class FormatRequestInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.notificationService.closeMessage();
    const newRequest = request.clone({
      params: request.params ? this.removeNullValuesFromQueryParams(request.params) : request.params,
      body: request.body ? this.deleteEmptyPropsFromBody(request.body) : request.body
    });
    return next.handle(newRequest);
  }
  deleteEmptyPropsFromBody(obj: any): any {
    return Object.keys(obj).forEach((k) => {
      if (obj[k] instanceof Object) {
        k = this.deleteEmptyPropsFromBody(obj[k]);
      } else if (obj[k] === null || obj[k] === '' || (Array.isArray(obj[k]) && obj[k].length === 0)) {
        delete obj[k];
      }
    });
  }
  removeNullValuesFromQueryParams(params: HttpParams) {
    const paramsKeysAux = params.keys();
    paramsKeysAux.forEach((key) => {
      const value = params.get(key);
      if (value === null || value === undefined || value === '' || value === 'null') {
        params['map'].delete(key);
      }
    });

    return params;
  }
}
