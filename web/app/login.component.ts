import {Component} from '@angular/core';
import {UserService} from './services/user.services';

@Component({
  selector : 'login-component',
  templateUrl : 'public/pages/user/login.component.html',
  providers : [UserService]
})

export class LoginComponent{
  public username:string = "";
  public password:string = "";
  constructor(public userService : UserService){

  }
  doLogin(){
    this.userService.login(this.username, this.password)
    .subscribe(token => {
      if(token){
        //Logic to store token
        alert('Succesful');
        window.localStorage.setItem('token', token['token']);
      }
      }, error => {
        alert('Error');
      });
    }
}
