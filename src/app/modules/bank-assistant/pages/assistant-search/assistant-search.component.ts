import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { FinancialAssistantModel, FinancialMovementModel, FinancialPeriodModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { GLOBAL } from '@global/globals';
import { Subscription } from 'rxjs';
import { CreateAssistantModalComponent } from '../../components/create-assistant-modal/create-assistant-modal.component';
import { CreateExpenseComponent } from '../../components/create-expense/create-expense.component';
import { CreateIncomeComponent } from '../../components/create-income/create-income.component';
import { AssistantService } from '../../services/assistant.service';
import { MovementsService } from '../../services/movements.service';
import { PeriodService } from '../../services/period.service';

@Component({
  selector: 'app-assistant-search',
  templateUrl: './assistant-search.component.html',
  styleUrls: ['./assistant-search.component.scss']
})
export class AssistantSearchComponent implements OnInit, OnDestroy {
  assistant: FinancialAssistantModel;
  period: FinancialPeriodModel;
  movements: ResultListModel<FinancialMovementModel> = new ResultListModel<FinancialMovementModel>();
  displayedColumns: string[] = ['date', 'name', 'concept', 'type', 'amount'];
  assistantSubscription: Subscription;
  movementSubscription: Subscription;
  periodSubscription: Subscription;
  search: BaseSearchCriteria = new BaseSearchCriteria();
  global = GLOBAL;
  constructor(
    private dialog: MatDialog,
    private assistantService: AssistantService,
    private movementService: MovementsService,
    private periodService: PeriodService
  ) {}

  ngOnInit(): void {
    this.assistantService.initialize();
    this.periodService.initialize();
    this.movementService.initialize();
    this.load();
  }
  ngOnDestroy(): void {
    this.assistantSubscription.unsubscribe();
    this.periodSubscription.unsubscribe();
    this.movementSubscription.unsubscribe();
  }
  load(): void {
    this.assistantSubscription = this.assistantService.bankAssistant$().subscribe((data) => {
      this.assistant = data;
      console.log('assistant', data);
    });
    this.periodSubscription = this.periodService.connectPeriod$().subscribe((data) => {
      this.period = data;
      console.log('period', data);
    });
    this.movementSubscription = this.movementService.connectBankMovements$().subscribe((data) => {
      this.movements = data;
      this.search.totalPages = data.totalPages;
      this.search.totalRecords = data.totalRecords;
    });
  }
  createAssistant(): void {
    this.dialog.open(CreateAssistantModalComponent);
  }
  createIncome(): void {
    this.dialog.open(CreateIncomeComponent, { data: this.assistant });
  }
  createExpense(): void {
    this.dialog.open(CreateExpenseComponent, { data: this.assistant });
  }
  changePage(event: PageEvent) {
    this.search.page = event.pageIndex + 1;
    this.search.perPage = event.pageSize;
    this.movementService.search(this.search);
  }
  sort(event: Sort) {
    this.search.orderBy = event.active;
    this.search.orderDir = event.direction;
    this.movementService.search(this.search);
  }
}
