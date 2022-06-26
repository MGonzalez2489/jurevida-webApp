import { Injectable } from '@angular/core';
import { ContributionModel, UserModel } from '@core/models/database';
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
  postContribution(publicId: string, contribution: string): Observable<ResultModel<ContributionModel>> {
    return this.requestService.post(`users/${publicId}/council/contribution`, { contribution });
  }

  deleteContribution(publicId: string): Observable<ResultModel<boolean>> {
    return this.requestService.delete(`contribution/${publicId}`);
  }
}
