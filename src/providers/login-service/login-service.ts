import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../../entity/Utils';
import { Usuario } from '../../entity/Usuario';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  private loginUrl: string;
  private refreshUrl: string;
  public userUrl: string;
  public handleError: any;
  
  constructor(
    public http: HttpClient
  ) {
    this.loginUrl = Utils.getUrlBackend() + "oauth/token?grant_type=password&username=<USERNAME>&password=<PASSWORD>";
    this.refreshUrl = Utils.getUrlBackend() + "oauth/token?grant_type=refresh_token&refresh_token=";
    this.userUrl = Utils.getUrlBackend() + "usuario/logado";
  }

  public login(usuario: Usuario): Observable<any> {
    let url = this.loginUrl.replace("<USERNAME>", usuario.email).replace("<PASSWORD>", encodeURIComponent(usuario.senha));
    let headers = new HttpHeaders().set("Authorization", "Basic " + btoa("cliente" + ':' + "123"));
    return this.http.post(url, {}, { headers });
  }

  public getUsuarioAtual(token: any) {
    let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.userUrl, { headers });
  }

  public getAccessToken(refreshToken) {
    let url = this.refreshUrl + refreshToken;
    let headers = new HttpHeaders().set("Authorization", "Basic " + btoa("cliente" + ':' + "123"));
    return this.http.post(url, {}, { headers });
  }
}
