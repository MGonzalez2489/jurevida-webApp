import { ResultListModel } from '../responses';
import { FinancialMovementModel } from './financial-movement.model';

export class FinanceReport {
  assistant: string = '';
  period: string = '';
  periodYear: string = '';
  startAmount: number = 0;
  endAmount: number = 0;
  currentAmount: number = 0;
  isPettyCash: boolean = false;
  incomeCount: number = 0;
  incomeTotalAmount: number = 0;
  expenseCount: number = 0;
  expenseTotalAmount: number = 0;
  isCurrentPeriod: boolean = false;

  movements: ResultListModel<FinancialMovementModel> = new ResultListModel();
}
