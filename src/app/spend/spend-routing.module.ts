import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSpendComponent } from './edit-spend/edit-spend.component';
import { SpendListComponent } from './spend-list/spend-list.component';

const routes: Routes = [
  {
    path : "", component : SpendListComponent
  },
  {
    path : "create", component : EditSpendComponent
  },
  {
    path : "edit/:id", component : EditSpendComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpendRoutingModule { }
