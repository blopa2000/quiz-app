import { Component } from '@angular/core';

interface Items {
  data: string;
  id: string;
}
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
