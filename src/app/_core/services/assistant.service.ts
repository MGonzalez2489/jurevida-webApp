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
  private pettySub$ = new BehaviorSubject<FinancialAssistantModel>(new FinancialAssistantModel());
  constructor(private requestService: RequestService, private periodService: PeriodService) {}

  initializeBank(): void {
    this.loadBank();
  }
  initializePetty(): void {
    this.loadPetty();
  }

  private loadBank(): void {
    this.requestService.get<FinancialAssistantModel>(`assistant/bank`).subscribe((data) => {
      this.bankSub$.next(data.model);
    });
  }
  private loadPetty(): void {
    this.requestService.get<FinancialAssistantModel>(`assistant/petty`).subscribe((data) => {
      this.pettySub$.next(data.model);
    });
  }

  connectBankAssistant$(): Observable<FinancialAssistantModel> {
    return this.bankSub$.asObservable();
  }
  connectPettyAssistant$(): Observable<FinancialAssistantModel> {
    return this.pettySub$.asObservable();
  }

  postCreate(newAssistant: { bank: string; accountNumber: string; isPettyCash: boolean; amount: number }): void {
    this.requestService.post('assistant', newAssistant).subscribe((data) => {
      if (newAssistant.isPettyCash) {
        this.loadPetty();
        this.periodService.initializePettyCash();
      } else {
        this.periodService.initializeBank();
        this.loadBank();
      }
    });
  }
}
