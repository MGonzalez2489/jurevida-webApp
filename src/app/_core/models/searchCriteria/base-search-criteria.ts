export class BaseSearchCriteria {
  keyword: string = '';
  page: number = 1; // number of current page
  perPage: number = 10; // count per page
  totalRecords: number = 0; // total count
  totalPages: number = 0; // total count of pages
  orderBy: string = '';
  orderDir: string = '';
  constructor() {
    this.page = 1;
    this.perPage = 10;
    this.totalPages = 0;
  }
}
