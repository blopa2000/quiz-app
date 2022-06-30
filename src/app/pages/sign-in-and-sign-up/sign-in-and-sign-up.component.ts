import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user/user.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-and-sign-up.component.html',
  styleUrls: ['./sign-in-and-sign-up.component.scss'],
})
export class SignInAndSignUpComponent {
  addClass: boolean = false;

  constructor(
    private authServices: AuthService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }
  loginForm!: FormGroup;
  logupForm!: FormGroup;

  alert = {
    status: false,
    message: '',
    type: 'error',
  };

  async signIn(e: Event) {
    e.preventDefault();
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const res = await this.authServices.signIn({
          email,
          password,
        });

        this.router.navigate(['home']);
      } catch (error: any) {
        console.log(error.code);

        if (error.code === 'auth/invalid-email') {
          this.alert = {
            status: true,
            type: 'error',
            message: 'Invalid email',
          };
        } else if (error.code === 'auth/weak-password') {
          this.alert = {
            status: true,
            type: 'error',
            message: 'Weak password',
          };
        } else if (error.code === 'auth/user-not-found') {
          this.alert = {
            status: true,
            type: 'error',
            message: 'User not found',
          };
        } else if (error.code === 'auth/wrong-password') {
          this.alert = {
            status: true,
            type: 'error',
            message: 'Wrong password',
          };
        } else {
          this.alert = { status: true, type: 'error', message: error.message };
        }

        setTimeout(() => {
          this.alert.status = false;
        }, 3000);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  async signUp(e: Event) {
    if (this.logupForm.valid) {
      try {
        const { email, password, name } = this.logupForm.value;
        const res = await this.authServices.register({ email, password });

        const user = await this.userService.addUser(name, res.user.uid);

        if (user) {
          this.router.navigate(['home']);
        } else {
          console.log('erorr');
        }
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          this.alert = {
            status: true,
            type: 'error',
            message: 'Email already in use',
          };
        } else {
          this.alert = { status: true, type: 'error', message: error.message };
        }
        setTimeout(() => {
          this.alert.status = false;
        }, 3000);
      }
    } else {
      this.logupForm.markAllAsTouched();
    }
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]],
    });

    this.logupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, , Validators.minLength(9)]],
    });
  }

  //login

  get emailLoginFormControl() {
    return this.loginForm.get('email');
  }

  get passwordLoginFormControl() {
    return this.loginForm.get('password');
  }

  //logup

  get emailLogupFormControl() {
    return this.logupForm.get('email');
  }

  get nameLogupFormControl() {
    return this.logupForm.get('name');
  }

  get passwordLogupFormControl() {
    return this.logupForm.get('password');
  }
}
