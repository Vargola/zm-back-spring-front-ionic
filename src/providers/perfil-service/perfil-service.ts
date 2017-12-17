import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../../entity/Utils';

/*
  Generated class for the PerfilServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerfilServiceProvider {

  private perfilUrl: string;
  public handleError: any;

  constructor(public http: HttpClient) {
    this.perfilUrl = Utils.getUrlBackend() + "perfil/";
  }

  public getPerfis() {
    return this.http.get(this.perfilUrl);
  }
}
