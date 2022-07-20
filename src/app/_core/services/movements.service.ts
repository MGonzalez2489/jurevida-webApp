import { Injectable } from '@angular/core';
import { FinancialMovementModel } from '@core/models/database';
import { ResultListModel, ResultModel } from '@core/models/responses';
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
  global = GLOBAL;

  private bankMovementsSub$ = new BehaviorSubject<ResultListModel<FinancialMovementModel>>(new ResultListModel<FinancialMovementModel>());
  private prettyCashMovementsSub$ = new BehaviorSubject<ResultListModel<FinancialMovementModel>>(new ResultListModel<FinancialMovementModel>());

  constructor(private requestService: RequestService, private periodService: PeriodService, private notificationService: NotificationService) {}

  initializeBankMovements(): void {
    this.searchBankMoves();
  }
  initializePrettyMovements(): void {
    this.searchPettyMoves();
  }

  // Bank assistant
  connectBankMovements$(): Observable<ResultListModel<FinancialMovementModel>> {
    return this.bankMovementsSub$.asObservable();
  }
  searchBankMovements(params: MovementSearchCriteria): void {
    this.searchBankMoves(params);
  }
  private searchBankMoves(search?: MovementSearchCriteria): void {
    this.requestService.getList<FinancialMovementModel>(`assistant/bank/movements`, search).subscribe((data) => {
      this.bankMovementsSub$.next(data);
    });
  }
  createBankIncome(assistantId: string, income: { amount: number; concept: string }): Observable<ResultModel<FinancialMovementModel>> {
    return this.requestService.post<FinancialMovementModel>(`assistant/${assistantId}/income`, income).pipe(
      tap(() => {
        this.periodService.initializeBank();
        this.searchBankMoves();
        this.notificationService.openMessage(`${this.global.INCOME} creado exitosamente.`);
      })
    );
  }
  createBankExpense(assistantId: string, expense: { amount: number; concept: string }): Observable<ResultModel<FinancialMovementModel>> {
    return this.requestService.post<FinancialMovementModel>(`assistant/${assistantId}/expense`, expense).pipe(
      tap(() => {
        this.periodService.initializeBank();
        this.searchBankMoves();
        this.notificationService.openMessage(`${this.global.EXPENSE} creado exitosamente.`);
      })
    );
  }

  // Petty Cash assistant
  connectPettyCashMovements$(): Observable<ResultListModel<FinancialMovementModel>> {
    return this.prettyCashMovementsSub$.asObservable();
  }
  searchPettyMovements(params: MovementSearchCriteria): void {
    this.searchPettyMoves(params);
  }
  private searchPettyMoves(search?: MovementSearchCriteria): void {
    this.requestService.getList<FinancialMovementModel>(`assistant/petty/movements`, search).subscribe((data) => {
      this.prettyCashMovementsSub$.next(data);
    });
  }

  createPettyIncome(assistantId: string, income: { amount: number; concept: string }): Observable<ResultModel<FinancialMovementModel>> {
    return this.requestService.post<FinancialMovementModel>(`assistant/${assistantId}/income`, income).pipe(
      tap(() => {
        this.periodService.initializePettyCash();
        this.searchPettyMoves();
        this.notificationService.openMessage(`${this.global.INCOME} creado exitosamente.`);
      })
    );
  }
  createPettyExpense(assistantId: string, expense: { amount: number; concept: string }): Observable<ResultModel<FinancialMovementModel>> {
    return this.requestService.post<FinancialMovementModel>(`assistant/${assistantId}/expense`, expense).pipe(
      tap(() => {
        this.periodService.initializePettyCash();
        this.searchPettyMoves();
        this.notificationService.openMessage(`${this.global.EXPENSE} creado exitosamente.`);
      })
    );
  }

  // General

  export(assistantId: string, movementSearch: MovementSearchCriteria): Observable<ResultModel<boolean>> {
    return this.requestService.get<boolean>(`assistant/${assistantId}/movement/export`, movementSearch);
  }

  delete(publicId: string, isPettyAssistant: boolean): void {
    this.requestService.delete(`movement/${publicId}`).subscribe((data) => {
      if (isPettyAssistant) {
        this.periodService.initializePettyCash();
        this.searchPettyMoves();
      } else {
        this.periodService.initializeBank();
        this.searchBankMoves();
      }
      this.notificationService.openMessage(`Movimiento eliminado exitosamente.`);
    });
  }
}
