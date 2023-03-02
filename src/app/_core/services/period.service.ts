import { Injectable } from '@angular/core';
import { FinancialPeriodModel } from '@core/models/database';
import { RequestService } from '@core/services';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private bankPeriodSub$ = new BehaviorSubject<FinancialPeriodModel>(new FinancialPeriodModel());
  private prettyCashSub$ = new BehaviorSubject<FinancialPeriodModel>(new FinancialPeriodModel());

  constructor(private requestService: RequestService) {}

  initializeBank(): void {
    this.loadBankPeriod();
  }
  initializePettyCash(): void {
    this.loadPettyCashPeriod();
  }

  connectBankPeriod$(): Observable<FinancialPeriodModel> {
    return this.bankPeriodSub$.asObservable();
  }
  connectPettyCashPeriod$(): Observable<FinancialPeriodModel> {
    return this.prettyCashSub$.asObservable();
  }

  private loadBankPeriod(): void {
    this.requestService.get<FinancialPeriodModel>(`period`, { isPettyCash: false }).subscribe((data) => {
      this.bankPeriodSub$.next(data.model);
    });
  }
  private loadPettyCashPeriod(): void {
    this.requestService.get<FinancialPeriodModel>(`period`, { isPettyCash: true }).subscribe((data) => {
      this.prettyCashSub$.next(data.model);
    });
  }
}
