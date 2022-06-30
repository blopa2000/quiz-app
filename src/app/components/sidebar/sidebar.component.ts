import { Component, Input, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

import { User } from '@models/user.model';

import { SettingDialogComponent } from '@components/setting-dialog/setting-dialog.component';

import { StoreService } from '@services/store/store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() user: User | DocumentData | undefined;
  @Input() uid!: string | null;

  activeSidebar: boolean = false;

  constructor(private storeService: StoreService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.storeService.activeSidebar$.subscribe((value) => {
      this.activeSidebar = value;
    });
  }

  toggleSidebar() {
    this.storeService.toggleSidebar();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SettingDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { ...this.user, uid: this.uid },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.user = result;
      }
    });
  }
}
