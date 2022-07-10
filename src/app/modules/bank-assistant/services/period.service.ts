import { Injectable } from '@angular/core';
import { FinancialPeriodModel } from '@core/models/database';
import { RequestService } from '@core/services';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private periodSub$ = new BehaviorSubject<FinancialPeriodModel>(new FinancialPeriodModel());
  constructor(private requestService: RequestService) {}

  initialize(): void {
    this.loadPeriod();
  }

  connectPeriod$(): Observable<FinancialPeriodModel> {
    return this.periodSub$.asObservable();
  }

  private loadPeriod(): void {
    this.requestService.get<FinancialPeriodModel>('financial/period').subscribe((data) => {
      this.periodSub$.next(data.model);
    });
  }
}
