import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilServiceProvider } from '../../providers/perfil-service/perfil-service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers: [PerfilServiceProvider]
})

export class PerfilPage {
  public perfis: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public perfilService: PerfilServiceProvider,
    private cookieService: CookieService
  ) {
    let token = this.cookieService.get("accessToken");
    console.log("token -> " + token);
    this.perfilService.getPerfis(this.cookieService.get("accessToken")).subscribe(
      res => {
        this.perfis = (res as any);
      },
      error => {
        console.log("Error on constructor PerfilPage: " + error);
      }
    )
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PerfilPage');
  }

}
