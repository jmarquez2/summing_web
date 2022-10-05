import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {
    loadChildren : () => import("./spend/spend.module").then(m => m.SpendModule), path : "spend"
  },
  {
    path : "", redirectTo : "spend", pathMatch : "full"
  },
  {
    path : "**", component : NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
