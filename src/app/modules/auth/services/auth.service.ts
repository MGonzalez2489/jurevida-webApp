import { Injectable } from '@angular/core';
import { SessionModel } from '@core/models/database';
import { ResultModel } from '@core/models/responses';
import { RequestService } from '@core/services';
import { ILogin } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private requestService: RequestService) {}

  postLogin(loginParams: ILogin): Observable<ResultModel<SessionModel>> {
    return this.requestService.post<SessionModel>('auth/login', loginParams);
  }
}
