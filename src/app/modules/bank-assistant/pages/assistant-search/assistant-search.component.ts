import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinancialAssistantModel } from '@core/models/database';
import { CreateAssistantModalComponent } from '../../components/create-assistant-modal/create-assistant-modal.component';
import { CreateExpenseComponent } from '../../components/create-expense/create-expense.component';
import { CreateIncomeComponent } from '../../components/create-income/create-income.component';
import { AssistantService } from '../../services/assistant.service';

@Component({
  selector: 'app-assistant-search',
  templateUrl: './assistant-search.component.html',
  styleUrls: ['./assistant-search.component.scss']
})
export class AssistantSearchComponent implements OnInit {
  assistant: FinancialAssistantModel = new FinancialAssistantModel();
  displayedColumns: string[] = ['date', 'name', 'concept', 'type', 'amount'];

  constructor(private dialog: MatDialog, private assistantService: AssistantService) {}

  ngOnInit(): void {
    if (!this.assistant.publicId) {
      this.load();
    }
  }
  load(): void {
    this.assistantService.getAssistantBank().subscribe(
      (data) => {
        if (data.model) {
          this.assistant = data.model;
          console.log('assistant', this.assistant);
        }
      },
      (error) => {}
    );
  }
  createAssistant(): void {
    const dialog = this.dialog.open(CreateAssistantModalComponent);
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.load();
      }
    });
  }
  createIncome(): void {
    const dialog = this.dialog.open(CreateIncomeComponent, { data: { assistant: this.assistant.publicId } });
    dialog.afterClosed().subscribe((data: any) => {
      this.load();
    });
  }
  createExpense(): void {
    const dialog = this.dialog.open(CreateExpenseComponent, { data: this.assistant });
    dialog.afterClosed().subscribe((data: any) => {
      this.load();
    });
  }
}
