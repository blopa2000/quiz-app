import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardQuizComponent } from './components/card-quiz/card-quiz.component';

import { MaterialUiModule } from '@material';
import { StopPropagationDirective } from './directives/stopPropagation/stop-propagation.directive';
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
  declarations: [CardQuizComponent, StopPropagationDirective],
  imports: [CommonModule, MaterialUiModule, RouterModule, NgxMasonryModule],
  exports: [CardQuizComponent],
})
export class SharedModule {}
