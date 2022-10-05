import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {

  constructor(private cookieService: CookieService) {

  }
  ngOnInit(): void {

    var token = this.cookieService.get("token")
    if (!token) {
      document.location.href = `${environment.authUrl}auth/login/web`
    }else{
      this.loading = false;
    }
  }
  public loading = true;



}
