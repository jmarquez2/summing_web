import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatPaginatorModule} from '@angular/material/paginator'

import { SpendRoutingModule } from './spend-routing.module';
import { SpendListComponent } from './spend-list/spend-list.component';
import { EditSpendComponent } from './edit-spend/edit-spend.component';


@NgModule({
  declarations: [
    SpendListComponent,
    EditSpendComponent
  ],
  imports: [
    CommonModule,
    SpendRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatPaginatorModule

  ]
})
export class SpendModule { }
