import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { DataAccess } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private router: Router,
    private userService: UserService
  ) {}

  register({ email, password }: DataAccess) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn({ email, password }: DataAccess) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
