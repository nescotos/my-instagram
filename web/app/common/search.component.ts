import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.services';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';

@Component({
  selector : 'seach-component',
  templateUrl : 'public/pages/common/search.component.html',
  directives : [RouterLink]
})

export class SearchComponent implements OnInit{
  public users;
  constructor(public userService: UserService, public params:RouteParams){

  }

  ngOnInit(){
    this.userService.search(this.params.get('query')).subscribe(users => {
      if(users){
        this.users = users;
      }
    })
  }
}
