import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';

interface Items {
  data: string;
  id: string;
}
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  item: Items[] = [{ data: '', id: '' }];

  constructor(private firestore: Firestore) {
    this.getdata();
  }

  async getdata() {
    const data = await getDocs(collection(this.firestore, 'items'));
    data.forEach((d: any) => {
      this.item = [{ ...d.data(), id: d.id }];
    });
  }
}
