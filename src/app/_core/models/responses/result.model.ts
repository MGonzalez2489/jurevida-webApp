export class ResultModel<T> {
  isSuccess: boolean = false;
  model: T;
  message: string = '';
  httpError: string = '';
}
