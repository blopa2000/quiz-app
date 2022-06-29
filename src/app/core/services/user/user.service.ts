import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { UserExists } from '@models/user.model';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<UserExists>({
    email: '',
    uid: '',
  });

  user$ = this.user.asObservable();

  constructor(private firestore: Firestore, private storage: Storage) {}

  addUserStore(user: UserExists) {
    this.user.next(Object.assign(user));
  }

  async getUser(uid: string | any) {
    const res = await getDoc(doc(this.firestore, 'users', uid));
    return res.data();
  }

  async avatar(file: any, uid: string) {
    try {
      const ext = file!.name.split('.').pop();
      const path = `${uid}.${ext}`;

      const storageRef = ref(this.storage, path);
      const task = uploadBytesResumable(storageRef, file);
      await task;
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      return false;
    }
  }

  async updateUser(
    avatar: string,
    uid: string,
    name: string
  ): Promise<boolean> {
    try {
      const res = await updateDoc(doc(this.firestore, 'users', uid), {
        avatar,
        name,
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
