import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Spend } from 'src/app/models/Spend';
import { WsComponent } from 'src/app/tools/wscomponent';

@Component({
  selector: 'app-edit-spend',
  templateUrl: './edit-spend.component.html',
  styleUrls: ['./edit-spend.component.scss']
})
export class EditSpendComponent extends WsComponent<Spend> {


  constructor(private router: Router, private route: ActivatedRoute, service: ApiService, cookie: CookieService, private snackbar: MatSnackBar) {
    super(service, cookie);
    this.id = this.route.snapshot.paramMap.get("id");
    this.title = this.id ? "Edit spend" : "Create spend"
  }
  private id: string | null

  spend: Spend | null = null
  errorMessage = false
  loading = true

  title: string

  formSpend = new FormGroup({
    cost: new FormControl(0, Validators.required),
    description: new FormControl('', Validators.required)
  })

  fetchData() {

    if (this.id != null) {
      return this.service.getSpendDetail(Number(this.id));
    } else {
      return null
    }

  }

  next(result: Spend): void {
    this.spend = result;
    this.formSpend.setValue({

      cost: this.spend.cost,
      description: this.spend.description

    });

  }

  error(err: any): void {
    this.errorMessage = true;
    this.loading = false;
  }

  save() {

    var observable: Observable<any>

    if (this.spend == null) {
      observable = this.service.saveSpend(this.formSpend.value);
    } else {
      this.spend!.cost = this.formSpend.value.cost!;
      this.spend!.description = this.formSpend.value.description!;
      observable = this.service.updateSpend(this.spend);
    }


    observable.subscribe({
      next: (value) => {
        
        this.snackbar.open(value.message, "Ok", {
          duration: 2000
        });
        this.router.navigate(["/spend"])
      },

      error: (err) => {
        if (err.status == 401) {
          this.goToLogin();
        } else {
          this.snackbar.open("Error saving spend", "Dismiss", {
            duration: 2000
          })
        }
      },
      complete: () => {

      }
    })
  }


}
