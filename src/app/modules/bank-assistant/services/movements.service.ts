import { Injectable } from '@angular/core';
import { FinancialMovementModel } from '@core/models/database';
import { ResultListModel, ResultModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { MovementSearchCriteria } from '@core/models/searchCriteria/movement-search-criteria';
import { NotificationService, RequestService } from '@core/services';
import { GLOBAL } from '@global/globals';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PeriodService } from './period.service';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  private bankMovementsSub$ = new BehaviorSubject<ResultListModel<FinancialMovementModel>>(new ResultListModel<FinancialMovementModel>());
  global = GLOBAL;
  constructor(private requestService: RequestService, private periodService: PeriodService, private notificationService: NotificationService) {}

  initialize(): void {
    const s = new MovementSearchCriteria();
    s.orderBy = 'createdAt';
    s.orderDir = 'desc';
    this.search(s);
  }

  connectBankMovements$(): Observable<ResultListModel<FinancialMovementModel>> {
    return this.bankMovementsSub$.asObservable();
  }

  search(params: MovementSearchCriteria): void {
    this.searchMovements(params);
  }

  createIncome(assistantId: string, income: { amount: number; concept: string }): Observable<ResultModel<FinancialMovementModel>> {
    return this.requestService.post<FinancialMovementModel>(`financial/assistant/${assistantId}/income`, income).pipe(
      tap(() => {
        this.periodService.initialize();
        this.searchMovements();
        this.notificationService.openMessage(`${this.global.INCOME} creado exitosamente.`);
      })
    );
  }

  createExpense(assistantId: string, expense: { amount: number; concept: string }): Observable<ResultModel<FinancialMovementModel>> {
    return this.requestService.post<FinancialMovementModel>(`financial/assistant/${assistantId}/expense`, expense).pipe(
      tap(() => {
        this.periodService.initialize();
        this.searchMovements();
        this.notificationService.openMessage(`${this.global.EXPENSE} creado exitosamente.`);
      })
    );
  }

  export(): Observable<ResultModel<boolean>> {
    return this.requestService.get<boolean>('financial/assistant/bank/movements/export');
  }

  delete(publicId: string): void {
    this.requestService.delete(`movement/${publicId}`).subscribe((data) => {
      this.periodService.initialize();
      this.searchMovements();
      this.notificationService.openMessage(`Movimiento eliminado exitosamente.`);
    });
  }

  private searchMovements(search?: MovementSearchCriteria): void {
    this.requestService.getList<FinancialMovementModel>(`financial/assistant/bank/movements`, search).subscribe((data) => {
      this.bankMovementsSub$.next(data);
    });
  }
}
