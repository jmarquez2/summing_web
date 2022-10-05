import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Spend } from 'src/app/models/Spend';
import { WsComponent } from 'src/app/tools/wscomponent';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-spend-list',
  templateUrl: './spend-list.component.html',
  styleUrls: ['./spend-list.component.scss']
})
export class SpendListComponent extends WsComponent<Spend[]> {


  constructor(apiService: ApiService, cookie: CookieService, private router: Router, private snackbar: MatSnackBar) {
    super(apiService, cookie);
  }


  public list: Spend[] = []
  public dataSource: Spend[] = this.list;
  public loading = true
  public errorMessage = false;

  totalItems = 20
  pageSizeOptions = [5, 10, 20, 50, 100]
  limit = 20
  offset = 0

  private useCache = false;


  displayedColumns: string[] = ['id', 'description', 'cost', "date", "action"];

  fetchData(): Observable<Spend[]> {
    return this.service.getSpend(this.limit, this.offset);
  }

  next(result: Spend[]): void {

    this.list = result;
    this.dataSource = result
    this.loading = false;
    this.totalItems = result.length >= this.limit ? result.length + 1 : result.length;

  }

  error(err: any): void {

    this.errorMessage = true;
    this.loading = false;
  }

  addSpend() {
    var id = 1
    this.router.navigate(["/spend/create"]);
  }

  editSpend(id: Number) {
    this.router.navigate(["/spend/edit", id])
  }

  toDate(value: string) {
    var date = new Date(value);
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return utcDate;

  }

  deleteSpend(spend: Spend) {
    if (confirm(`Delete this spend?: \nDescription: ${spend.description}\nCost: ${spend.cost}`)) {
      this.service.deleteSpend(spend.id!).subscribe({
        next: (result) => {
          this.snackbar.open(result.message, "Dismiss", {
            duration: 2000
          });
          this.offset = 0;
          this.loadData();
        },
        error: (_) => {
          this.snackbar.open("Error deleting spend", "Dismiss", {
            duration: 2000
          });
        },

      })
    }
  }


  switchPage(event: PageEvent) {

    let differentPageSize = this.limit != event.pageSize;
    this.limit = event.pageSize;
    this.offset = event.pageIndex * event.pageSize;

    if (differentPageSize) {
      this.useCache = false;
      this.loadData();
    } else {

      if (((event.previousPageIndex ?? 0) > event.pageIndex) || this.useCache) {

        this.dataSource = this.list.slice(this.offset, this.offset + this.limit)

      } else {

        this.fetchData().subscribe({
          next: (result) => {
            if (result.length == 0) {
              this.totalItems = this.list.length;

            } else {
              this.list = this.list.concat(result);
              this.dataSource = result;
              if(result.length >= this.limit){
                this.totalItems =  this.list.length + 1;
              }else{
                this.totalItems =  this.list.length;
                this.useCache = true;
              }

              
            }

          },

          error: (err) => {
            this.error(err);
          }
        })

      }
    }

  }


}
