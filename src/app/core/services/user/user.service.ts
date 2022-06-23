import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Params } from '@angular/router';
import { UserExists } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<UserExists>({
    email: '',
    uid: '',
  });

  user$ = this.user.asObservable();

  constructor(private firestore: Firestore) {}

  addUserStore(user: UserExists) {
    this.user.next(Object.assign(user));
  }

  async getUser(uid: string | any) {
    const res = await getDoc(doc(this.firestore, 'users', uid));
    return res.data();
  }
}
