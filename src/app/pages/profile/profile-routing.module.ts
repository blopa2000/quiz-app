import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

import { CardQuizComponent } from '@shared/components/card-quiz/card-quiz.component';
import { CreateQuizComponent } from '@components/create-quiz/create-quiz.component';
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
        component: CreateQuizComponent,
      },
      {
        path: 'detail/:id',
        component: DetailQuizComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
