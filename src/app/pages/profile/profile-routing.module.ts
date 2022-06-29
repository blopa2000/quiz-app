import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

import { CardQuizComponent } from '@shared/components/card-quiz/card-quiz.component';
import { FormQuizComponent } from '@components/form-quiz/form-quiz.component';
import { DetailQuizComponent } from '@components/detail-quiz/detail-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: '/my-list',
        pathMatch: 'full',
      },
      {
        path: 'my-list',
        component: CardQuizComponent,
      },
      {
        path: 'create',
        component: FormQuizComponent,
      },
      {
        path: 'detail/:id',
        component: DetailQuizComponent,
      },
      {
        path: 'edit/:id',
        component: FormQuizComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
