import { BaseSearchCriteria } from './base-search-criteria';

export class MovementSearchCriteria extends BaseSearchCriteria {
  startDate: string = '';
  endDate: string = '';
  name: string = '';
  concept: string = '';
  type: string | 'income' | 'expense' = '';
}
