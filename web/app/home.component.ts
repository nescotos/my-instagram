import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from './common/header.component';
import {MainComponent} from './common/main.component';
import {RouteConfig, RouterOutlet, Router} from '@angular/router-deprecated';

@Component({
  selector: 'home-component',
  template: `
    <header-component></header-component>
    <div class="jumbotron">
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [HeaderComponent, RouterOutlet]
})

@RouteConfig([
    { path: '/', name: "Main", component: MainComponent, useAsDefault : true},
    // { path: '/login', name: "Login", component: }
])

export class HomeComponent{

}
