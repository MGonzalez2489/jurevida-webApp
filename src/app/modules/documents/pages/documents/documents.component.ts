import { Component, OnInit } from '@angular/core';
import { DocumentModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  search: BaseSearchCriteria = new BaseSearchCriteria();
  documents: ResultListModel<DocumentModel> = new ResultListModel<DocumentModel>();
  constructor(private documentService: DocumentsService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }
  loadDocuments(): void {
    this.documentService.getAll(this.search).subscribe(
      (data) => {
        this.documents = data;
        console.log(this.documents.model);
      },
      (error) => {}
    );
  }
}
