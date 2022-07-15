import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialAssistantModel } from '@core/models/database';
import { GLOBAL } from '@global/globals';
import { MovementsService } from '../../services/movements.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit, OnDestroy {
  assistant: FinancialAssistantModel = new FinancialAssistantModel();
  global = GLOBAL;
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    concept: new FormControl(null, [Validators.required])
  });
  constructor(
    private dialogRef: MatDialogRef<CreateExpenseComponent>,
    private movementService: MovementsService,
    @Inject(MAT_DIALOG_DATA) public data: FinancialAssistantModel
  ) {}

  ngOnInit(): void {
    this.assistant = this.data;
  }
  ngOnDestroy(): void {}
  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.movementService.createExpense(this.assistant.publicId, this.form.value).subscribe((data) => {
      this.dialogRef.close();
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
