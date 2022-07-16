import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { FinancialAssistantModel, FinancialMovementModel, FinancialPeriodModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { MovementSearchCriteria } from '@core/models/searchCriteria/movement-search-criteria';
import { AssistantService, MovementsService, PeriodService } from '@core/services';
import { environment } from '@environment/environment';
import { GLOBAL } from '@global/globals';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { CreateAssistantModalComponent } from '@shared/components/financial/create-assistant-modal/create-assistant-modal.component';
import { CreateExpenseModalComponent } from '@shared/components/financial/create-expense-modal/create-expense-modal.component';
import { CreateIncomeModalComponent } from '@shared/components/financial/create-income-modal/create-income-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assistant-search',
  templateUrl: './assistant-search.component.html',
  styleUrls: ['./assistant-search.component.scss']
})
export class AssistantSearchComponent implements OnInit, OnDestroy {
  assistant: FinancialAssistantModel;
  period: FinancialPeriodModel;
  movements: ResultListModel<FinancialMovementModel> = new ResultListModel<FinancialMovementModel>();
  displayedColumns: string[] = ['date', 'name', 'concept', 'type', 'amount', 'actions'];
  assistantSubscription: Subscription;
  movementSubscription: Subscription;
  periodSubscription: Subscription;
  search: MovementSearchCriteria = new MovementSearchCriteria();
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
    this.movementService.initializeBankMovements();
    this.load();
  }
  ngOnDestroy(): void {
    this.assistantSubscription.unsubscribe();
    this.periodSubscription.unsubscribe();
    this.movementSubscription.unsubscribe();
  }
  load(): void {
    this.assistantSubscription = this.assistantService.connectBankAssistant$().subscribe((data) => {
      this.assistant = data;
    });
    this.periodSubscription = this.periodService.connectBankPeriod$().subscribe((data) => {
      this.period = data;
    });
    this.movementSubscription = this.movementService.connectBankMovements$().subscribe((data) => {
      this.movements = data;
      console.log('movements', data);
      this.search.totalPages = data.totalPages;
      this.search.totalRecords = data.totalRecords;
    });
  }
  createAssistant(): void {
    this.dialog.open(CreateAssistantModalComponent, { data: { isPettyCash: false } });
  }
  createIncome(): void {
    this.dialog.open(CreateIncomeModalComponent, { data: this.assistant });
  }
  createExpense(): void {
    this.dialog.open(CreateExpenseModalComponent, { data: { assistant: this.assistant, period: this.period } });
  }
  changePage(event: PageEvent) {
    this.search.page = event.pageIndex + 1;
    this.search.perPage = event.pageSize;
    this.movementService.searchBankMovements(this.search);
  }
  sort(event: Sort) {
    this.search.orderBy = event.active;
    this.search.orderDir = event.direction;
    this.movementService.searchBankMovements(this.search);
  }

  searchMovement() {
    this.movementService.searchBankMovements(this.search);
  }
  export() {
    this.movementService.export(this.assistant.publicId).subscribe(
      (data) => {
        console.log('response export', data);

        window.open(`${environment.baseUrl}${data.model}`);
      },
      (error) => {
        console.log('error eport', error);
      }
    );
  }
  delete(movement: FinancialMovementModel): void {
    const movementType = movement.type == 'income' ? this.global.INCOME : this.global.EXPENSE;
    const title = `Desea eliminar este ${movementType}?`;
    const description = `Recuerde que eliminar un movimiento es una accion irreversible y afectara el balance actual.`;
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      panelClass: 'confirmation-modal',
      data: { title: title, description: description }
    });

    dialog.afterClosed().subscribe((data) => {
      console.log('dialog response', data);
      if (data) {
        this.movementService.delete(movement.publicId, this.assistant.isPettyCash);
      }
    });
  }
}
