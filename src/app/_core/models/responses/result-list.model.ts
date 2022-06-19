export class ResultListModel<T> {
  isSuccess: boolean = false;
  model: Array<T> = [];
  totalRecords: number = 0;
  totalPages: number = 0;
  message: string = '';
  httpError: string = '';

  constructor() {
    this.model = new Array<T>();
  }
}
