import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { Sort } from '@angular/material/sort';
import { UserModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { UserSearchCriteria } from '@core/models/searchCriteria';
import { SessionService } from '@core/services';
import { GLOBAL } from '@global/globals';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'options'];
  search: UserSearchCriteria = new UserSearchCriteria();
  users: ResultListModel<UserModel> = new ResultListModel();
  global = GLOBAL;
  mobileQuery: MediaQueryList;
  currentUser: UserModel;
  showFiller = true;
  searchKeyword: string = '';
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private userService: UserService, private sessionService: SessionService) {
    this.mobileQuery = media.matchMedia('(max-width:600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.currentUser = sessionService.getSessionUser()!;
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
  filterType(event: MatSelectionListChange, sideBar: MatDrawer) {
    this.search.profile = event.options[0].value;
    this.loadUsers();
    if (this.mobileQuery.matches) {
      sideBar.toggle();
    }
  }
  searchByKeyword() {
    if (this.searchKeyword != this.search.keyword) {
      this.search.keyword = this.searchKeyword;
      this.loadUsers();
    }
  }
}
