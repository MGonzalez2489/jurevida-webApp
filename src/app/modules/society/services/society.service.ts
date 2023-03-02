import { Injectable } from '@angular/core';
import { UserModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { RequestService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {
  constructor(private requestService: RequestService) {}

  getCouncilMembers(search: BaseSearchCriteria): Observable<ResultListModel<UserModel>> {
    return this.requestService.getList<UserModel>('users/council', search);
  }

  getAssociatedMembers(search: BaseSearchCriteria): Observable<ResultListModel<UserModel>> {
    return this.requestService.getList<UserModel>('users/associates', search);
  }
}
