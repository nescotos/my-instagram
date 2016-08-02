import {Component, OnInit} from "@angular/core";
import {UserService} from './services/user.services';
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import {Router} from "@angular/router";
import {Page} from "ui/page";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    providers: [UserService],
    directives: [NS_ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit {

  constructor(page: Page,public userService: UserService, public router: Router) {
    //Hide Action Bar
      page.actionBarHidden = true;
  }

  ngOnInit(){
    //Redirect if neccesary
    if(this.userService.isAuth()){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/login']);
    }
  }

}
