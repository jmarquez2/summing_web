import { Component, OnDestroy, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "../api.service";


@Component({
    template : ''
})
export abstract class WsComponent<T> implements OnInit, OnDestroy{

    constructor(protected service : ApiService, private cookie : CookieService){}

    private subscription? : Subscription;


    ngOnInit(): void {
        this.loadData();
    }

    protected loadData(){
        this.subscription = this.fetchData()?.subscribe({
            error : (err) =>{
                if(err.status == 401){

                    this.service.getToken().subscribe({
                        next : (result : any) => {
                            var now = new Date()
                            now.setHours(now.getHours() + 1)
                            now.setMinutes(now.getMinutes() + 30)
                            this.cookie.set("token", result.id_token,  now);

                            this.fetchData()?.subscribe();
                        },

                        error : (err) => {
                            this.goToLogin()
                        }
                    })

                }else{
                    this.error(err);
                }
            },

            next: (value) => {
                this.next(value)
            }
        });
    }


    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    protected goToLogin(){
        this.cookie.delete("token");
        document.location.href = `${environment.authUrl}auth/login/web`;
    }

    abstract fetchData() : Observable<T> | null

    abstract next(result : T) : void;
    

    abstract error(err : any) : void;

}