import { Injectable } from '@angular/core';
import { UserModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {
  private sponsorsSub$: BehaviorSubject<ResultListModel<UserModel>> = new BehaviorSubject(new ResultListModel<UserModel>());
  constructor(private requestService: RequestService) {}

  initialize(): void {
    this.load();
  }

  connect$(): Observable<ResultListModel<UserModel>> {
    return this.sponsorsSub$.asObservable();
  }
  search(search: BaseSearchCriteria): void {
    this.load(search);
  }
  private load(search?: BaseSearchCriteria) {
    if (!search) {
      search = new BaseSearchCriteria();
    }
    return this.requestService.getList<UserModel>('users/sponsors', search).subscribe((data) => {
      this.sponsorsSub$.next(data);
    });
  }
}
