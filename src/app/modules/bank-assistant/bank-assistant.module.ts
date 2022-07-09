import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAssistantRoutingModule } from './bank-assistant-routing.module';
import { AssistantSearchComponent } from './pages/assistant-search/assistant-search.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateAssistantModalComponent } from './components/create-assistant-modal/create-assistant-modal.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateIncomeComponent } from './components/create-income/create-income.component';
import { CreateExpenseComponent } from './components/create-expense/create-expense.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@shared/_shared.module';

@NgModule({
  declarations: [AssistantSearchComponent, CreateAssistantModalComponent, CreateIncomeComponent, CreateExpenseComponent],
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
    SharedModule
  ]
})
export class BankAssistantModule {}
