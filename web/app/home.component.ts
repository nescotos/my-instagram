import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from './common/header.component';
import {MainComponent} from './common/main.component';
import {ProfileComponent} from './common/profile.component';
import {SearchComponent} from './common/search.component';
import {PhotoComponent} from './common/photo.component';
import {FollowerComponent} from './common/follower.component';
import {FollowingComponent} from './common/following.component';
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
    { path: '/user/:userId', name: "Profile", component: ProfileComponent },
    { path: '/search/:query', name: "Search", component: SearchComponent},
    { path: '/photo/:id', name : 'Photo', component: PhotoComponent },
    { path: '/followers/:id', name : 'Followers', component: FollowerComponent },
    { path: '/following/:id', name : 'Followings', component: FollowingComponent }
])

export class HomeComponent{

}
