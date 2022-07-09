import { Injectable } from '@angular/core';
import { FinancialAssistantModel } from '@core/models/database';
import { ResultModel } from '@core/models/responses';
import { RequestService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  constructor(private requestService: RequestService) {}

  getAssistantBank(): Observable<ResultModel<FinancialAssistantModel>> {
    return this.requestService.get('financial/assistant/bank');
  }

  postCreate(newAssistant: {
    bank: string;
    accountNumber: string;
    isPrettyCash: boolean;
    amount: number;
  }): Observable<ResultModel<FinancialAssistantModel>> {
    return this.requestService.post('financial/assistant', newAssistant);
  }
}
