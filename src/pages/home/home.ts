import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public cookieService: CookieService
  ) {
  }

  public logout() {
    this.cookieService.removeAll();
    this.navCtrl.setRoot(LoginPage);
  }

}
