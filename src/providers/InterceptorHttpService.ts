import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LoginServiceProvider } from './login-service/login-service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

@Injectable()
export class InterceptorHttpService implements HttpInterceptor {

    constructor(
        private inj: Injector
        //,private cookieService: CookieService
        //private loginService: LoginServiceProvider
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent |
        HttpHeaderResponse |
        HttpProgressEvent |
        HttpResponse<any> |
        HttpUserEvent<any>> {
        //return next.handle(req);
        //let cookieService = this.inj.get(CookieService);
        return next.handle(req.clone({
        })).catch(error => {
            if (error instanceof HttpErrorResponse) {
                switch ((<HttpErrorResponse>error).status) {
                    case 401:
                        return this.getAccessToken(req, next);
                    case 0:
                        return this.getAccessToken(req, next);
                }
                Observable.throw(error);
            }
            else {
                Observable.throw(error);
            }
        });
    }

    private getAccessToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        let loginService = this.inj.get(LoginServiceProvider);
        let cookieService = this.inj.get(CookieService);
        return loginService.getAccessToken(cookieService.get("refreshToken")).switchMap(
            res => {
                cookieService.put("accessToken", (res as any).access_token);
                return next.handle(req.clone({
                    setHeaders: { Authorization: 'Bearer ' + cookieService.get("accessToken") }
                }));
            }
        )
    }

}