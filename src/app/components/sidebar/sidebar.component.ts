import { Component, OnInit } from '@angular/core';

import { StoreService } from '@services/store/store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
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
