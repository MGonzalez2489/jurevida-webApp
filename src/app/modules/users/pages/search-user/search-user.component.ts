import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { UserModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { UserSearchCriteria } from '@core/models/searchCriteria';
import { GLOBAL } from '@global/globals';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'options'];
  search: UserSearchCriteria = new UserSearchCriteria();
  users: ResultListModel<UserModel> = new ResultListModel();
  global = GLOBAL;
  mobileQuery: MediaQueryList;

  showFiller = true;
  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private userService: UserService
  ) {
    this.mobileQuery = media.matchMedia('(max-width:600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.loadUsers();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
    this.loadUsers();
  }
  changePage(event: PageEvent) {
    this.search.page = event.pageIndex + 1;
    this.search.perPage = event.pageSize;
    this.loadUsers();
  }
  filterType(event: MatSelectionListChange) {
    this.search.profile = event.options[0].value;
    this.loadUsers();
  }
}
