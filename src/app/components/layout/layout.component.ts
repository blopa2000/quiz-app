import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

import { StoreService } from '@services/store/store.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  isProfile: boolean = true;
  isForm: boolean = false;
  user: any = {
    uid: '',
    email: '',
  };

  subscriber: Subscription | null = null;

  constructor(
    private location: Location,
    private router: Router,
    private storeService: StoreService,
    private authService: AuthService,
    private auth: Auth
  ) {
    this.isProfile = this.location.path().includes('profile');
  }

  ngOnInit(): void {
    this.isForm = this.location.path().includes('quiz');
    this.subscriber = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.isProfile = this.location.path().includes('profile');
        this.isForm = this.location.path().includes('quiz');
      });

    const unsubscribe = onAuthStateChanged(this.auth, (currentUser) => {
      this.user = {
        email: currentUser?.email,
        uid: currentUser?.uid,
      };
    });
    unsubscribe();
  }

  toggleSidebar() {
    this.storeService.toggleSidebar();
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }

  exit() {
    this.authService.logout().then(() => {
      this.router.navigate(['/entry']);
    });
  }
}
