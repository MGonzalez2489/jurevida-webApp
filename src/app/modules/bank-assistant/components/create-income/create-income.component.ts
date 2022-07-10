import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialAssistantModel } from '@core/models/database';
import { distinctUntilChanged } from 'rxjs';
import { MovementsService } from '../../services/movements.service';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss']
})
export class CreateIncomeComponent implements OnInit {
  assistant: FinancialAssistantModel = new FinancialAssistantModel();
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
    this.assistant = this.data;
  }
  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.movementService.createIncome(this.assistant.publicId, this.form.value).subscribe((data) => {
      this.dialogRef.close();
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
