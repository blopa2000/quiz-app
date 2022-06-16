import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { CreateQuizComponent } from '@components/create-quiz/create-quiz.component';

@NgModule({
  declarations: [ProfileComponent, SidebarComponent, CreateQuizComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
