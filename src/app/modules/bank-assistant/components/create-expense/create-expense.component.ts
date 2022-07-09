import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialAssistantModel } from '@core/models/database';
import { MovementsService } from '../../services/movements.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit {
  assistant: string = '';
  form: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required]),
    concept: new FormControl(null, [Validators.required])
  });
  constructor(
    private dialogRef: MatDialogRef<CreateExpenseComponent>,
    private movementService: MovementsService,
    @Inject(MAT_DIALOG_DATA) public data: FinancialAssistantModel
  ) {}

  ngOnInit(): void {
    console.log('this.data', this.data);
  }
  submit(): void {
    this.movementService.createExpense(this.assistant, this.form.value).subscribe(
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
