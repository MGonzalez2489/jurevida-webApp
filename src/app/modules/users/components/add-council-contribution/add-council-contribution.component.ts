import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '@core/models/database';
import { CouncilService } from '../../services/council.service';

@Component({
  selector: 'app-add-council-contribution',
  templateUrl: './add-council-contribution.component.html',
  styleUrls: ['./add-council-contribution.component.scss']
})
export class AddCouncilContributionComponent implements OnInit {
  user: UserModel = new UserModel();
  form: FormGroup = new FormGroup({
    contribution: new FormControl(null, [Validators.required])
  });

  constructor(
    private dialogRef: MatDialogRef<AddCouncilContributionComponent>,
    private councilService: CouncilService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.user = this.data['user'];
  }

  dimiss(): void {
    this.dialogRef.close(false);
  }
  submit(): void {
    if (!this.form.valid) {
      return;
    }

    this.councilService.postContribution(this.user.publicId, this.form.value.contribution).subscribe(
      (data) => {
        console.log('data', data);
        this.dialogRef.close(true);
      },
      (error) => {}
    );
  }
}
