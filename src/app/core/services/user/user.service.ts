import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { setDoc } from '@firebase/firestore';
import {
  Firestore,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  QuerySnapshot,
  DocumentData,
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

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

  constructor(private firestore: Firestore, private storage: Storage) {}

  addUserStore(user: UserExists) {
    this.user.next(Object.assign(user));
  }

  async addUser(name: string, uid: string) {
    try {
      await setDoc(doc(this.firestore, 'users', uid), {
        name,
        avatar: '',
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
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

  async getMyResults(
    uid: string
  ): Promise<QuerySnapshot<DocumentData> | undefined | boolean> {
    try {
      const res = await getDocs(
        collection(this.firestore, 'users', uid, 'myResults')
      );
      return res;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  async addResult(uid: string, quizID: string, result: any): Promise<boolean> {
    try {
      if (uid !== undefined) {
        const res = await setDoc(
          doc(this.firestore, 'users', uid, 'myResults', quizID),
          {
            ...result,
          }
        );
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
