import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { UserModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { GLOBAL } from '@global/globals';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'options'];
  search: BaseSearchCriteria = new BaseSearchCriteria();
  users: ResultListModel<UserModel> = new ResultListModel();
  global = GLOBAL;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll(this.search).subscribe(
      (data) => {
        this.users = data;
        this.search.totalPages = data.totalPages;
        this.search.totalRecords = data.totalRecords;
        console.log('users', this.users);
      },
      (error) => {}
    );
  }
  sort(event: Sort) {
    this.search.orderBy = event.active;
    this.search.orderDir = event.direction;
  }
  changePage(event: PageEvent) {
    this.search.page = event.pageIndex + 1;
    this.search.perPage = event.pageSize;
    this.loadUsers();
  }
}
