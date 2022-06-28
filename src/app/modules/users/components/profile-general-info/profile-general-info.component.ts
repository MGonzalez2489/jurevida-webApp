import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '@core/models/database';
import { EditUserInfoModalComponent } from '../edit-user-info-modal/edit-user-info-modal.component';

@Component({
  selector: 'app-profile-general-info',
  templateUrl: './profile-general-info.component.html',
  styleUrls: ['./profile-general-info.component.scss']
})
export class ProfileGeneralInfoComponent implements OnInit {
  @Input()
  user: UserModel = new UserModel();
  constructor(public dialog: MatDialog) {}

  @Output()
  update: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {}

  edit(): void {
    const dialog = this.dialog.open(EditUserInfoModalComponent, {
      width: '450px',
      data: { user: this.user }
    });

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.update.emit(true);
      }
    });
  }
}
