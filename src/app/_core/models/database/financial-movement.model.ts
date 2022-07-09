import { BaseModel } from './base.model';
import { FinancialPeriodModel } from './financial-period.model';

export class FinancialMovementModel extends BaseModel {
  type: string = '';
  amount: number = 0;
  concept: string = '';
  period: FinancialPeriodModel = new FinancialPeriodModel();
}
