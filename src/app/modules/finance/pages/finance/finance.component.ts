import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { FinanceReport, FinancialMovementModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { MovementSearchCriteria } from '@core/models/searchCriteria/movement-search-criteria';
import { environment } from '@environment/environment';
import { GLOBAL } from '@global/globals';
import { FinanceService } from '../../services/finance.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  view: string | 'bank' | 'petty' = 'bank';
  financeReport: FinanceReport = new FinanceReport();
  movements: ResultListModel<FinancialMovementModel> = new ResultListModel();
  displayedColumns: string[] = ['date', 'name', 'concept', 'type', 'amount'];
  global = GLOBAL;
  search: MovementSearchCriteria = new MovementSearchCriteria();

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.loadReport();
  }
  changeView(newView: string): void {
    this.view = newView;
    this.loadReport();
  }
  loadReport(): void {
    const isPetty = this.view == 'bank' ? false : true;
    this.financeService.getFinanceReport('', isPetty, this.search).subscribe((data) => {
      this.financeReport = data.model;
      this.movements = data.model.movements;
      this.search.totalPages = this.movements.totalPages;
      this.search.totalRecords = this.movements.totalRecords;
    });
  }
  clearSearch(): void {
    this.search.type = '';
    this.search.startDate = '';
    this.search.endDate = '';
    this.search.name = '';
    this.search.concept = '';
    this.loadReport();
  }
  exportCurrentPeriod(): void {
    const periodSearch = new MovementSearchCriteria();
    const currentYear = new Date().getFullYear();
    periodSearch.startDate = new Date(currentYear, 0, 1, 0, 0, 0, 0).toLocaleString();
    periodSearch.endDate = new Date(currentYear, 11, 31, 59, 59, 59, 999).toLocaleString();
    this.financeService.export(this.financeReport.assistant, this.financeReport.period, periodSearch).subscribe(
      (data) => {
        window.open(`${environment.baseUrl}${data.model}`);
      },
      (error) => {}
    );
  }
  exportCurrentSearch(): void {
    this.financeService.export(this.financeReport.assistant, this.financeReport.period, this.search).subscribe(
      (data) => {
        window.open(`${environment.baseUrl}${data.model}`);
      },
      (error) => {}
    );
  }
  changePage(event: PageEvent): void {
    this.search.page = event.pageIndex + 1;
    this.search.perPage = event.pageSize;
    this.loadReport();
  }
  sort(event: Sort): void {
    this.search.orderBy = event.active;
    this.search.orderDir = event.direction;
    this.loadReport();
  }
}
