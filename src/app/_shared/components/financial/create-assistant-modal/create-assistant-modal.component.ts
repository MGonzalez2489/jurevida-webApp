import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssistantService } from '@core/services';

@Component({
  selector: 'app-create-assistant-modal',
  templateUrl: './create-assistant-modal.component.html',
  styleUrls: ['./create-assistant-modal.component.scss']
})
export class CreateAssistantModalComponent implements OnInit {
  title: string = 'Nuevo Auxiliar de Banco';
  form: FormGroup = new FormGroup({
    bank: new FormControl(null),
    accountNumber: new FormControl(null),
    isPettyCash: new FormControl(false, [Validators.required]),
    amount: new FormControl(0, [Validators.required])
  });
  constructor(
    private dialogRef: MatDialogRef<CreateAssistantModalComponent>,
    private assistantService: AssistantService,
    @Inject(MAT_DIALOG_DATA) public data: { isPettyCash: boolean }
  ) {}

  ngOnInit(): void {
    const isPettyCash = this.data.isPettyCash;
    if (isPettyCash) {
      this.title = 'Nuevo Auxiliar de Caja';
    }
    this.form.patchValue({ isPettyCash });
    this.setPettyCash(isPettyCash);
  }
  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.assistantService.postCreate(this.form.value);
    this.assistantService.connectBankAssistant$().subscribe((data) => {
      this.dialogRef.close();
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }

  setPettyCash(isPettyCash: boolean): void {
    this.form.patchValue({ bank: null });
    this.form.patchValue({ accountNumber: null });
    if (isPettyCash) {
      this.form.controls['bank'].addValidators(Validators.required);
      this.form.controls['accountNumber'].addValidators(Validators.required);
    } else {
      this.form.controls['bank'].clearValidators();
      this.form.controls['accountNumber'].clearValidators();
    }
    this.form.controls['bank'].updateValueAndValidity();
    this.form.controls['accountNumber'].updateValueAndValidity();
  }
}
