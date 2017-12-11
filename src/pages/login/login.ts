import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public nav: NavController,
    private loginService: LoginServiceProvider,
    private cookieService: CookieService
  ) {

    this.loginForm = formBuilder.group({
      email: [''],
      senha: ['']
    });

  }

  public loginUser(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        res => {
          this.loginSuccess(res as any);
        },
        error => {
          console.log("Error on method loginUser: " + error);
        }
      );
    }
    else {
      this.loading.present();
    }
  }

  public loginSuccess(res: any) {
    this.cookieService.removeAll();
    this.cookieService.put("accessToken", res.access_token);
    this.loginService.getUsuarioAtual(res.access_token).subscribe(
      res => {
        this.redirectPage(res as any);
      },
      error => {
        console.log("Error on method loginSuccess: " + error);
      }
    )
  }

  public redirectPage(res: any) {
    this.cookieService.putObject("usuarioAtual", res);
    this.navCtrl.setRoot(TabsPage);
  }

  redirectUser(res: any) {
    this.cookieService.removeAll();
    this.cookieService.put("accessToken", res.access_token);
  }
}
