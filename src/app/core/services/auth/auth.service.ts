import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { DataAccess } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  register({ email, password }: DataAccess) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn({ email, password }: DataAccess) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  async resetPassword(email: string): Promise<boolean> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return true;
    } catch (error) {
      return false;
    }
  }
}
