import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Page} from "ui/page";
import {setHintColor} from "../../utils/hint.util";
import {TextField} from "ui/text-field";
import {Color} from "color";
import {Config} from '../../config';
import {UserService} from  '../../services/user.services';
import {SocketService} from '../../services/socket.services';
var appSettings = require("application-settings");

@Component({
    selector: 'login-component',
    templateUrl: './views/login/login.component.html',
    styleUrls: ["app.css"],
    providers: [UserService, SocketService]
})

export class LoginComponent implements OnInit {
    //@ViewChild("email") email: ElementRef;
    //@ViewChild("password") password: ElementRef;
    password:string = "";
    username:string = "";

    constructor(public page: Page, public userService:UserService, public socket:SocketService) {

    }

    ngOnInit(){
      this.page.actionBarHidden = true;
      // this.setTextFieldColors();
    }

    doLogin(){
      this.userService.login(this.username, this.password)
      .subscribe(token => {
        if(token){
          //Checking if we got success in login
          //Logic to store token
          if(token['success']){
            appSettings.setString('token', token['token']);
            // //Redirect
            // this.router.navigate(['Home']);
            this.socket.joinWatchSocket();
            alert('Login success');
          }else{
            // this.error = token['message'];
            alert(token['message']);
          }
        }
        }, error => {
          alert('Error');
        });
      }

      isAuth(){
        return this.userService.isAuth();
      }

    // setTextFieldColors() {
    //     let emailTextField = <TextField>this.email.nativeElement;
    //     let passwordTextField = <TextField>this.password.nativeElement;
    //     let mainTextColor = new Color("#C4AFB4");
    //     emailTextField.color = mainTextColor;
    //     passwordTextField.color = mainTextColor;
    //
    //     let hintColor = new Color("#ACA6A7");
    //     setHintColor({ view: emailTextField, color: hintColor });
    //     setHintColor({ view: passwordTextField, color: hintColor });
    // }
}
