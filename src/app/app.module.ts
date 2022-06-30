import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AppComponent } from './app.component';

import { MaterialUiModule } from '@material';
import { SharedModule } from '@shared/shared.module';
import { environment } from '../environments/environment';

import { DialogForgotPasswordComponent } from '@components/dialog-forgot-password/dialog-forgot-password.component';
import { LayoutComponent } from '@components/layout/layout.component';
import { DialogComponent } from '@components/dialog/dialog.component';

import { SignInAndSignUpComponent } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { ResultsComponent } from './pages/results/results.component';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    LayoutComponent,
    SignInAndSignUpComponent,
    DialogComponent,
    ResultsComponent,
    DialogForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialUiModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
