import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { UserModel } from '@core/models/database';
import { SessionService } from '@core/services';
import { ResetPasswordModalComponent } from '@shared/components/reset-password-modal/reset-password-modal.component';
import { iPage } from '@shared/interfaces/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output()
  toggleSideBar: EventEmitter<any> = new EventEmitter();

  page: iPage = {
    title: ''
    //error: '',
  };
  user: UserModel = new UserModel();

  constructor(private sessionService: SessionService, private router: Router, private dialog: MatDialog) {
    this.loadSessionInfo();
    this.sessionService.getCurrentSession().subscribe((data) => {
      this.user = data.user;
    });
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}
  emitToggleSideBar(): void {
    this.toggleSideBar.emit(null);
  }
  logOut(): void {
    this.sessionService.deleteSession();
    this.router.navigate(['/auth']);
  }
  loadSessionInfo(): void {
    this.sessionService.loadSessionInfo();
    if (this.sessionService.getSessionUser()?.firstLogin) {
      this.openModal();
    }
  }
  openModal(): void {
    this.dialog.open(ResetPasswordModalComponent, { disableClose: true });
  }
}
