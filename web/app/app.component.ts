import {Component, OnInit} from '@angular/core';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {UserService} from './services/user.services';
import {RouteConfig, RouterOutlet, Router} from '@angular/router-deprecated';

@Component({
    selector: 'my-instagram',
    template: '<router-outlet></router-outlet>',
    directives: [RouterOutlet, HomeComponent, LoginComponent],
    providers: [UserService]
})

@RouteConfig([
    { path: '/', name: "Home", component: HomeComponent, useAsDefault : true},
    { path: '/login', name: "Login", component: LoginComponent}
])

export class App implements OnInit{
  constructor(public userService:UserService, public router:Router){

  }

  ngOnInit(){
    //Check if user is auth
    if(this.userService.isAuth()){
      this.router.navigate(['Home']);
    }else{
      this.router.navigate(['Login']);
    }
  }

  isAuth(){
    return this.userService.isAuth();
  }
}
