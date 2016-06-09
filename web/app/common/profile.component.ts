import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.services';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';

@Component({
  selector : 'profile-component',
  templateUrl : 'public/pages/common/profile.component.html',
  directives : [RouterLink]
})

export class ProfileComponent implements OnInit{
  public user:any;
  constructor(public params : RouteParams, public userService : UserService){
    let userId = this.params.get('userId');
    this.userService.findUser(userId).subscribe(user => {
      if(user){
        this.user = user;
      }
    })
  }
  ngOnInit(){

  }

  getProfileImageURL(id){
    return '/api/v1/profile/' + id + '?token=' + this.userService.getToken();
  }

}
