import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssistantService } from '../../services/assistant.service';

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
    isPrettyCash: new FormControl(false, [Validators.required]),
    amount: new FormControl(0, [Validators.required])
  });
  constructor(
    private dialogRef: MatDialogRef<CreateAssistantModalComponent>,
    private assistantService: AssistantService,
    @Inject(MAT_DIALOG_DATA) public data: { isPrettyCash: boolean }
  ) {}

  ngOnInit(): void {
    const isPrettyCash = this.data.isPrettyCash;
    if (isPrettyCash) {
      this.title = 'Nuevo Auxiliar de Caja';
    }
    this.form.patchValue({ isPrettyCash });
    this.setPettyCash(isPrettyCash);
  }
  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.assistantService.postCreate(this.form.value);
    this.assistantService.bankAssistant$().subscribe((data) => {
      this.dialogRef.close();
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }

  setPettyCash(isPrettyCash: boolean): void {
    this.form.patchValue({ bank: null });
    this.form.patchValue({ accountNumber: null });
    if (isPrettyCash) {
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
