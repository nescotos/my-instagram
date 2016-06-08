import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.services';
import {Router, RouteParams} from '@angular/router-deprecated';

@Component({
  selector : 'profile-component',
  templateUrl : 'public/pages/common/profile.component.html'
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

}
