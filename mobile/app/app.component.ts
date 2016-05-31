import {Component} from "@angular/core";
import {RouteConfig, RouterOutlet, Router} from '@angular/router-deprecated';
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import {Page} from "ui/page";
import {HomeComponent} from './home.component';
import {LoginComponent} from './views/login/login.component';
@Component({
    selector: "my-app",
    templateUrl: './views/app.component.html',
    directives: [RouterOutlet, HomeComponent, LoginComponent, NS_ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', name: "Home", component: HomeComponent},
    { path: '/login', name: "Login", component: LoginComponent, useAsDefault : true}
])

export class AppComponent {

    constructor(page: Page) {
        page.actionBarHidden = true;
    }
}
