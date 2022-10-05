import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Spend } from './models/Spend';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private httpClient: HttpClient, private cookieService: CookieService) {

  }


  getSpend(limit = 20, offset = 0): Observable<Spend[]> {
    return this.httpClient.get<Spend[]>(`${environment.urlService}spend?limit=${limit}&offset=${offset}`, this.getHeaders());
  }

  deleteSpend(id : Number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.urlService}spend?ids=${id}`, this.getHeaders());
  }


  getSpendDetail(id: Number): Observable<Spend> {
    return this.httpClient.get<Spend>(`${environment.urlService}spend/detail/${id}`, this.getHeaders());
  }

  saveSpend(data : any): Observable<any> {
    return this.httpClient.post(`${environment.urlService}spend/`, data, this.getHeaders());
  }

  updateSpend(data : any) : Observable<any> {
    return this.httpClient.put(`${environment.urlService}spend/`, data, this.getHeaders());
  }

  getToken() {
    return this.httpClient.get(`${environment.authUrl}auth/token?token=${this.cookieService.get("token")}`)
  }



  private getHeaders() {
    return { headers: new HttpHeaders({ Authorization: "Bearer " + this.cookieService.get("token") }) }
  }

}
