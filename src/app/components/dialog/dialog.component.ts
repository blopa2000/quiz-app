import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  saveForm(): void {
    if (this.name.valid && this.email.valid) {
      this.dialogRef.close({
        name: this.name.value,
        email: this.email.value,
      });
    } else {
      this.name.markAllAsTouched();
      this.email.markAllAsTouched();
    }
  }
}
