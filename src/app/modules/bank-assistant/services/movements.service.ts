import { Injectable } from '@angular/core';
import { FinancialMovementModel } from '@core/models/database';
import { ResultListModel, ResultModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { RequestService } from '@core/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PeriodService } from './period.service';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  private bankMovementsSub$ = new BehaviorSubject<ResultListModel<FinancialMovementModel>>(new ResultListModel<FinancialMovementModel>());
  private searchSub$ = new BehaviorSubject<BaseSearchCriteria>(new BaseSearchCriteria());
  constructor(private requestService: RequestService, private periodService: PeriodService) {}

  initialize(): void {
    const s = this.searchSub$.value;
    s.orderBy = 'createdAt';
    s.orderDir = 'desc';
    this.search(s);
  }

  connectBankMovements$(): Observable<ResultListModel<FinancialMovementModel>> {
    return this.bankMovementsSub$.asObservable();
  }

  search(params: BaseSearchCriteria): void {
    this.searchSub$.next(params);
    this.searchMovements();
  }

  createIncome(assistantId: string, income: { amount: number; concept: string }): Observable<ResultModel<FinancialMovementModel>> {
    return this.requestService.post<FinancialMovementModel>(`financial/assistant/${assistantId}/income`, income).pipe(
      tap(() => {
        this.periodService.initialize();
        this.searchMovements();
      })
    );
  }

  createExpense(assistantId: string, expense: { amount: number; concept: string }): Observable<ResultModel<FinancialMovementModel>> {
    return this.requestService.post<FinancialMovementModel>(`financial/assistant/${assistantId}/expense`, expense).pipe(
      tap(() => {
        this.periodService.initialize();
        this.searchMovements();
      })
    );
  }

  private searchMovements(): void {
    this.requestService.getList<FinancialMovementModel>(`financial/assistant/bank/movements`, this.searchSub$.value).subscribe((data) => {
      this.bankMovementsSub$.next(data);
    });
  }
}
