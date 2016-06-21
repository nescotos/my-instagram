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

  follow(id){
    this.userService.follow(id).subscribe(follow => {
      if(follow['success']){
        this.user['followers'].push(this.userService.getId());
      }
    })
  }

  unfollow(id){
    this.userService.unfollow(id).subscribe(follow => {
      if(follow['success']){
        for(let i = 0; i < this.user['followers'].length; i++){
          if(this.user['followers'][i] == this.userService.getId()){
            this.user['followers'].splice(i, 1);
          }
        }
      }
    })
  }

  canFollow(){
    return (this.user['followers'].indexOf(this.userService.getId()) < 0 && this.user['_id'] != this.userService.getId());
  }

  getProfileImageURL(id){
    return '/api/v1/profile/' + id + '?token=' + this.userService.getToken();
  }

}
