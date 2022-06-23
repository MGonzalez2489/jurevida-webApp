import { Injectable } from '@angular/core';
import { UserModel } from '@core/models/database';
import { ResultModel } from '@core/models/responses';
import { RequestService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouncilService {
  constructor(private requestService: RequestService) {}

  post(user: UserModel): Observable<ResultModel<UserModel>> {
    return this.requestService.post('users/council', user);
  }
}
