import { Injectable } from '@angular/core';
import { FinanceReport } from '@core/models/database';
import { ResultModel } from '@core/models/responses';
import { MovementSearchCriteria } from '@core/models/searchCriteria/movement-search-criteria';
import { RequestService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  constructor(private requestService: RequestService) {}

  getFinanceReport(periodYear: string, isPettyCash: boolean, search: MovementSearchCriteria): Observable<ResultModel<FinanceReport>> {
    const filters = { periodYear, isPettyCash, ...search };
    return this.requestService.get(`finance`, filters);
  }
  export(assistantId: string, periodId: string, movementSearch: MovementSearchCriteria): Observable<ResultModel<boolean>> {
    const params = { assistantId, periodId, ...movementSearch };
    return this.requestService.get<boolean>(`movement/export`, params);
  }
}
