import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialAssistantModel, FinancialPeriodModel } from '@core/models/database';
import { MovementsService } from '@core/services';
import { GLOBAL } from '@global/globals';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense-modal.component.html',
  styleUrls: ['./create-expense-modal.component.scss']
})
export class CreateExpenseModalComponent implements OnInit, OnDestroy {
  assistant: FinancialAssistantModel = new FinancialAssistantModel();
  period: FinancialPeriodModel = new FinancialPeriodModel();
  subscription: Subscription;
  global = GLOBAL;
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    amount: new FormControl(0, [Validators.required, Validators.min(0)]),
    concept: new FormControl(null, [Validators.required])
  });
  formSubmited: boolean = false;
  get cForm() {
    return this.form.controls;
  }

  constructor(
    private dialogRef: MatDialogRef<CreateExpenseModalComponent>,
    private movementService: MovementsService,
    @Inject(MAT_DIALOG_DATA) public data: { assistant: FinancialAssistantModel; period: FinancialPeriodModel }
  ) {}

  ngOnInit(): void {
    this.assistant = this.data.assistant;
    this.period = this.data.period;
    this.form.controls['amount'].addValidators(Validators.max(this.period.currentAmount));
    this.form.controls['amount'].updateValueAndValidity();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  submit(): void {
    this.formSubmited = true;
    if (this.form.invalid) {
      return;
    }
    if (this.assistant.isPettyCash) {
      this.subscription = this.movementService.createPettyExpense(this.assistant.publicId, this.form.value).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.subscription = this.movementService.createBankExpense(this.assistant.publicId, this.form.value).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
