import { Injectable } from '@angular/core';
import { UserModel } from '@core/models/database';
import { ResultListModel, ResultModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { RequestService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private requestService: RequestService) {}

  getAll(search: BaseSearchCriteria): Observable<ResultListModel<UserModel>> {
    return this.requestService.getList<UserModel>('users', search);
  }
  getUser(publicId: string): Observable<ResultModel<UserModel>> {
    return this.requestService.get<UserModel>(`users/${publicId}`);
  }

  putUser(publicId: string, user: UserModel): Observable<ResultModel<UserModel>> {
    return this.requestService.put(`users/${publicId}`, user);
  }
}
