import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PerfilServiceProvider } from '../../providers/perfil-service/perfil-service';

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
    public perfilService: PerfilServiceProvider
  ) {
  }

  ionViewWillEnter() {
    this.perfis = [];
    this.perfilService.getPerfis().subscribe(
      res => {
        this.perfis = (res as any);
      },
      error => {
        console.log("Error on method ionViewWillEnter: " + error);
      }
    )

  }

}
