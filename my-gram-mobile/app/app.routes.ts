import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from './home/home.component'
import {MainComponent} from './home/main/main.component'
export const routes: RouterConfig = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent , children : [
    {path: "", component: MainComponent}
  ]},
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];
