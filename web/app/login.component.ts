import {Component} from '@angular/core';
import {UserService} from './services/user.services';
import {Router} from '@angular/router-deprecated';

@Component({
  selector : 'login-component',
  templateUrl : 'public/pages/user/login.component.html',
  providers : [UserService]
})

export class LoginComponent{
  public username:string = "";
  public password:string = "";
  public error:string;
  constructor(public userService : UserService, public router:Router){

  }
  doLogin(){
    this.userService.login(this.username, this.password)
    .subscribe(token => {
      if(token){
        //Checking if we got success in login
        //Logic to store token
        if(token['success']){
          window.localStorage.setItem('token', token['token']);
          //Redirect
          this.router.navigate(['Home']);
        }else{
          this.error = token['message'];
        }
      }
      }, error => {
        alert('Error');
      });
    }
}
