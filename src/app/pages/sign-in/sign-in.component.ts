import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(private authServices: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authServices
      .signIn({
        email: 'jpagudelo@gmail.com',
        password: '123456789',
      })
      .then((user) => {
        this.router.navigate(['home']);
      })
      .catch((error) => console.log(error));
  }
}
