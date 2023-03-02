import { Injectable } from '@angular/core';
import { DocumentModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { RequestService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  constructor(private requestService: RequestService) {}

  getAll(search: BaseSearchCriteria): Observable<ResultListModel<DocumentModel>> {
    return this.requestService.getList<DocumentModel>('documents', search);
  }
}
