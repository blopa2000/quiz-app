import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    DragDropModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    DragDropModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialUiModule {}
