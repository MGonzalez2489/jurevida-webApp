import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovementsService } from '../../services/movements.service';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss']
})
export class CreateIncomeComponent implements OnInit {
  assistant: string = '';
  form: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required]),
    concept: new FormControl(null, [Validators.required])
  });
  constructor(
    private dialogRef: MatDialogRef<CreateIncomeComponent>,
    private movementService: MovementsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.assistant = this.data['assistant'];
  }
  submit(): void {
    this.movementService.createIncome(this.assistant, this.form.value).subscribe(
      (data) => {
        console.log('data', data);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
