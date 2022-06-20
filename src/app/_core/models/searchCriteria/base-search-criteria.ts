import { GLOBAL } from '@global/globals';

export class BaseSearchCriteria {
  keyword: string = '';
  page: number = 1; // number of current page
  perPage: number = GLOBAL.PAGINATION_SIZE[1]; // count per page
  totalRecords: number = 0; // total count
  totalPages: number = 0; // total count of pages
  orderBy: string = '';
  orderDir: string = 'asc';
}
