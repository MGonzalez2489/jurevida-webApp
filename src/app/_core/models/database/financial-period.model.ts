import { BaseModel } from './base.model';
import { FinancialAssistantModel } from './financial-assistant.model';
import { FinancialMovementModel } from './financial-movement.model';

export class FinancialPeriodModel extends BaseModel {
  startDate: string = '';
  endDate: string = '';
  startAmount: number = 0;
  currentAmount: number = 0;
  endAmount: number = 0;
  active: boolean = false;
  assistant: FinancialAssistantModel = new FinancialAssistantModel();
  movements: Array<FinancialMovementModel> = [];
}
