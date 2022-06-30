import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.scss'],
})
export class DialogForgotPasswordComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    public dialogRef: MatDialogRef<DialogForgotPasswordComponent>,
    private authService: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async send() {
    if (this.emailFormControl.valid) {
      const res = await this.authService.resetPassword(
        this.emailFormControl.value
      );
      this.dialogRef.close(res);
    } else {
      this.emailFormControl.markAllAsTouched();
    }
  }
}
