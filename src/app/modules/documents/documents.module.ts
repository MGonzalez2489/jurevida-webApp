import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './pages/documents/documents.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DocumentsComponent],
  imports: [CommonModule, DocumentsRoutingModule, MatIconModule]
})
export class DocumentsModule {}
