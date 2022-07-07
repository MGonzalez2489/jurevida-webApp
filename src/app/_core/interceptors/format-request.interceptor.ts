import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FormatRequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
      } else if (!obj[k] || obj[k] === '' || (Array.isArray(obj[k]) && obj[k].length === 0)) {
        delete obj[k];
      }
    });
  }
  removeNullValuesFromQueryParams(params: HttpParams) {
    const paramsKeysAux = params.keys();
    paramsKeysAux.forEach((key) => {
      const value = params.get(key);
      if (value === null || value === undefined || value === '') {
        params['map'].delete(key);
      }
    });

    return params;
  }
}
