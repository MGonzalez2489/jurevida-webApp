import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAssistantRoutingModule } from './bank-assistant-routing.module';
import { AssistantSearchComponent } from './pages/assistant-search/assistant-search.component';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@shared/_shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [AssistantSearchComponent],
  imports: [
    CommonModule,
    BankAssistantRoutingModule,
    MatButtonModule,
    DialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    SharedModule,
    MatSortModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule
  ]
})
export class BankAssistantModule {}
