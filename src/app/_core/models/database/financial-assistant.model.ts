import { BaseModel } from './base.model';
import { FinancialPeriodModel } from './financial-period.model';

export class FinancialAssistantModel extends BaseModel {
  bank: string = '';
  accountNumber: string = '';
  isPrettyCash: boolean = false;
  periods: Array<FinancialPeriodModel> = [];
}
