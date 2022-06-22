import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { CreateQuizComponent } from '@components/create-quiz/create-quiz.component';
import { DetailQuizComponent } from '@components/detail-quiz/detail-quiz.component';

import { MaterialUiModule } from '@material';

@NgModule({
  declarations: [
    ProfileComponent,
    SidebarComponent,
    CreateQuizComponent,
    DetailQuizComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, MaterialUiModule],
})
export class ProfileModule {}
