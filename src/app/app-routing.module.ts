import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { LayoutComponent } from '@components/layout/layout.component';

import { SignInAndSignUpComponent } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { ResultsComponent } from './pages/results/results.component';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/form/form.component';

import { AccessGuard } from '@guards/access/access.guard';
import { ExistingUserGuard } from '@guards/existingUser/existing-user.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      { path: 'home', component: HomeComponent, canActivate: [AccessGuard] },
      {
        path: 'profile/:id',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [AccessGuard],
      },
      {
        path: 'quiz/:userUID/:quizID',
        component: FormComponent,
      },
      {
        path: 'result',
        component: ResultsComponent,
      },
    ],
  },
  {
    path: 'entry',
    component: SignInAndSignUpComponent,
    canActivate: [ExistingUserGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
