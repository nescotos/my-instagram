import {Component} from '@angular/core';
import {UserService} from '../services/user.services';
import {Router} from '@angular/router';
var appSettings = require("application-settings");
@Component({
  selector: 'login-page',
  templateUrl: './login/login.component.html',
  providers: [UserService]
})

export class LoginComponent{
  public username:string = "";
  public password:string = "";
  public vPassword:string = "";
  public name:string = "";
  public error:string;
  public registerError:string;
  public email:string;
  constructor(public userService : UserService, public router:Router){}

  doLogin(){
    this.userService.login(this.username, this.password)
    .subscribe(token => {
      if(token){
        //Checking if we got success in login
        //Logic to store token
        if(token['success']){
          appSettings.setString('token', token['token']);
          appSettings.setString('id', token['id']);
          appSettings.setString('username', token['username']);
          //Redirect
          this.router.navigate(['/home']);
        }else{
          this.error = token['message'];
        }
      }
      }, error => {
        alert('Error');
      });
    }

}
