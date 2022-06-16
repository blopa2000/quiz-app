import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { StoreService } from '@services/store/store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  isProfile: boolean = true;

  subscriber: Subscription | null = null;

  constructor(
    private location: Location,
    private router: Router,
    private storeService: StoreService
  ) {
    this.isProfile = this.location.path().includes('profile');
  }

  ngOnInit(): void {
    this.subscriber = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.isProfile = this.location.path().includes('profile');
      });
  }

  toggleSidebar() {
    this.storeService.toggleSidebar();
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }
}
