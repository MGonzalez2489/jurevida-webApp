import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PasswordService, SessionService } from '@core/services';
import Validation from '@shared/validators/MustMatch';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent {
  passwordForm: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
  );
  error: string = '';

  constructor(
    private passwordService: PasswordService,
    public dialogRef: MatDialogRef<ResetPasswordModalComponent>,
    private sessionService: SessionService
  ) {}

  submit(): void {
    if (this.passwordForm.valid) {
      const publicId = this.sessionService.getSessionUser()!.publicId;
      this.passwordService.resetPassword(this.passwordForm.value.currentPassword, this.passwordForm.value.password, publicId).subscribe(
        (data: any) => {
          this.dialogRef.close();
        },
        (error) => {}
      );
    }
  }
}
