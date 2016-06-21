import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.services';
import {RouteParams, RouterLink} from '@angular/router-deprecated';

@Component({
    selector: 'follower-component',
    templateUrl: 'public/pages/common/search.component.html',
    directives: [RouterLink]
})

export class FollowerComponent implements OnInit{

  public users;
  constructor(public userService: UserService, public params:RouteParams){

  }

  ngOnInit(){
    this.userService.getFollowers(this.params.get('id')).subscribe(users => {
      if(users){
        this.users = users;
      }
    })
  }

  getProfileImageURL(id){
    return '/api/v1/profile/' + id + '?token=' + this.userService.getToken();
  }


    follow(array, id){
      this.userService.follow(id).subscribe(follow => {
        if(follow['success']){
          array.push(this.userService.getId());
        }
      })
    }

    unfollow(array, id){
      this.userService.unfollow(id).subscribe(follow => {
        if(follow['success']){
          for(let i = 0; i < array.length; i++){
            if(array[i] == this.userService.getId()){
              array['followers'].splice(i, 1);
              break;
            }
          }
        }
      })
    }

    canFollow(array){
      return (array.indexOf(this.userService.getId()) < 0);
    }
}
