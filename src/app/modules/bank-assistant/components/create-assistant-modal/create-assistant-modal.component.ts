import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { AssistantService } from '../../services/assistant.service';

@Component({
  selector: 'app-create-assistant-modal',
  templateUrl: './create-assistant-modal.component.html',
  styleUrls: ['./create-assistant-modal.component.scss']
})
export class CreateAssistantModalComponent implements OnInit {
  form: FormGroup = new FormGroup({
    bank: new FormControl(null),
    accountNumber: new FormControl(null),
    isPrettyCash: new FormControl(false, [Validators.required]),
    amount: new FormControl(0, [Validators.required])
  });
  constructor(private dialogRef: MatDialogRef<CreateAssistantModalComponent>, private assistantService: AssistantService) {}

  ngOnInit(): void {}
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

  setPettyCash(event: MatCheckboxChange): void {
    if (event.checked) {
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
