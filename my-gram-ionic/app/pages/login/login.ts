import {Component} from '@angular/core';
import {Index} from '../index/index';
import {UserService} from '../../services/user.services';
import {NavController, Toast} from 'ionic-angular';
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [UserService]
})

export class Login {
  public username: string = "";
  public password: string = "";
  public vPassword: string = "";
  public name: string = "";
  public error: string;
  public registerError: string;
  public email: string;

  constructor(public userService: UserService, public nav: NavController) { }

  doLogin() {
    this.userService.login(this.username, this.password)
      .subscribe(token => {
        if (token) {
          //Checking if we got success in login
          //Logic to store token
          if (token['success']) {
            localStorage.setItem('token', token['token']);
            localStorage.setItem('id', token['id']);
            localStorage.setItem('username', token['username']);
            //Redirect
            this.nav.setRoot(Index);
          } else {
            this.error = token['message'];
            this.showError(token['message']);
          }
        }
      }, error => {
        alert('Error');
      });
  }

  showError(message) {
    const toast = Toast.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    this.nav.present(toast);
  }
}
