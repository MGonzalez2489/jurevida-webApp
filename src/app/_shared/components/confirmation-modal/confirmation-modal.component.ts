import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  title: string = 'Confirmacion!';
  description: string = 'Confirma que desea realizar esta accion?';
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string }
  ) {
    this.title = data.title;
    this.description = data.description;
  }

  ngOnInit(): void {}
  yes(): void {
    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
}
