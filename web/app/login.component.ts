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
  public vPassword:string = "";
  public name:string = "";
  public error:string;
  public registerError:string;
  public email:string;
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
          window.localStorage.setItem('id', token['id']);
          window.localStorage.setItem('username', token['username']);
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

    doRegister(){
      this.userService.register(this.username, this.password, this.name, this.email)
      .subscribe(res => {
        if(res){
          //Checking if we have success in operation
          if(res['success']){
            //Doing login
            this.doLogin();
          }else{
            //Display error
            this.registerError = res['message'];
          }
        }
      })
    }
}
