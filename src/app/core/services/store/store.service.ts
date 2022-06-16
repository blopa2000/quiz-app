import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private activeSidebar = new BehaviorSubject<boolean>(false);

  activeSidebar$ = this.activeSidebar.asObservable();

  constructor() {}

  toggleSidebar() {
    this.activeSidebar.next(!this.activeSidebar.value);
  }
}
