import { Injectable } from '@angular/core';
import { FinancialAssistantModel } from '@core/models/database';
import { RequestService } from '@core/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { PeriodService } from './period.service';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  private bankSub$ = new BehaviorSubject<FinancialAssistantModel>(new FinancialAssistantModel());

  constructor(private requestService: RequestService, private periodService: PeriodService) {}

  initialize(): void {
    this.loadBank();
  }

  private loadBank(): void {
    this.requestService.get<FinancialAssistantModel>(`assistant/bank`).subscribe((data) => {
      this.bankSub$.next(data.model);
    });
  }
  connectBankAssistant$(): Observable<FinancialAssistantModel> {
    return this.bankSub$.asObservable();
  }

  postCreate(newAssistant: { bank: string; accountNumber: string; isPettyCash: boolean; amount: number }): void {
    this.requestService.post('assistant', newAssistant).subscribe((data) => {
      if (newAssistant.isPettyCash) {
        this.periodService.initializePettyCash();
      } else {
        this.periodService.initializeBank();
      }
      this.loadBank();
    });
  }
}
