import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '@core/models/database';
import { CouncilService } from '../../services/council.service';
import { AddCouncilContributionComponent } from '../add-council-contribution/add-council-contribution.component';

@Component({
  selector: 'app-profile-council-info',
  templateUrl: './profile-council-info.component.html',
  styleUrls: ['./profile-council-info.component.scss']
})
export class ProfileCouncilInfoComponent implements OnInit {
  displayedColumns: string[] = ['contribution'];
  @Input()
  user: UserModel = new UserModel();

  @Output()
  update: EventEmitter<boolean> = new EventEmitter();
  constructor(public dialog: MatDialog, private councilService: CouncilService) {}

  ngOnInit(): void {}

  addContribution(): void {
    const dialog = this.dialog.open(AddCouncilContributionComponent, { width: '450px', data: { user: this.user } });
    dialog.afterClosed().subscribe((data: any) => {
      console.log('dialog result', data);
      if (data === true) {
        this.update.emit(true);
      }
    });
  }
  deleteContribution(publicId: string): void {
    this.councilService.deleteContribution(publicId).subscribe(
      (data) => {
        this.update.emit(true);
      },
      (error) => {}
    );
  }
}
