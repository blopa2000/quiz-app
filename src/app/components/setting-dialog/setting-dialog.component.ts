import { Component, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss'],
})
export class SettingDialogComponent {
  nameFormControl = new FormControl('', [Validators.required]);
  file!: ElementRef;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<SettingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nameFormControl.setValue(data.name);
  }

  onNoClick(e: Event): void {
    e.preventDefault();
    this.dialogRef.close();
  }

  async save(e: Event) {
    e.preventDefault();
    if (this.nameFormControl.valid) {
      let url: string | false = '';
      if (this.file !== undefined) {
        url = await this.userService.avatar(this.file, this.data.uid);
      } else {
        url = this.data.avatar;
      }

      if (url !== false) {
        const res = await this.userService.updateUser(
          url,
          this.data.uid,
          this.nameFormControl.value
        );

        if (res) {
          this.dialogRef.close({
            avatar: this.data.avatar,
            name: this.nameFormControl.value,
          });
        }
      }
    }
  }

  onUploadImg(e: Event | ElementRef | any) {
    this.file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      this.data.avatar = reader.result;
    };
  }
}
