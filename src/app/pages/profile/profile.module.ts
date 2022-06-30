import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';

import { MaterialUiModule } from '@material';
import { ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { FormQuizComponent } from '@components/form-quiz/form-quiz.component';
import { DetailQuizComponent } from '@components/detail-quiz/detail-quiz.component';
import { SettingDialogComponent } from '@components/setting-dialog/setting-dialog.component';
import { MyResultsComponent } from '@components/my-results/my-results.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SidebarComponent,
    FormQuizComponent,
    DetailQuizComponent,
    SettingDialogComponent,
    MyResultsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialUiModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
