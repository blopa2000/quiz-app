import { Component, Input, OnInit } from '@angular/core';

import { StoreService } from '@services/store/store.service';
import { User } from '@models/user.model';
import { DocumentData } from '@angular/fire/firestore';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() user: User | DocumentData | undefined;

  activeSidebar: boolean = false;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.activeSidebar$.subscribe((value) => {
      this.activeSidebar = value;
    });
  }

  toggleSidebar() {
    this.storeService.toggleSidebar();
  }
}
