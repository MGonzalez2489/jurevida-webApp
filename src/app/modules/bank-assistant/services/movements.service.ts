import { Injectable } from '@angular/core';
import { FinancialMovementModel } from '@core/models/database';
import { ResultModel } from '@core/models/responses';
import { RequestService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  constructor(private requestService: RequestService) {}

  createIncome(assistantId: string, income: { amount: number; concept: string }): Observable<ResultModel<FinancialMovementModel>> {
    return this.requestService.post(`financial/assistant/${assistantId}/income`, income);
  }
  createExpense(assistantId: string, expense: { amount: number; concept: string }): Observable<ResultModel<FinancialMovementModel>> {
    return this.requestService.post(`financial/assistant/${assistantId}/expense`, expense);
  }
}
