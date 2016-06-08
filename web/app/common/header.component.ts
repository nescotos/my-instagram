import {Component} from '@angular/core';
import {UserService} from '../services/user.services';
import {Router, RouterLink} from '@angular/router-deprecated';

@Component({
  selector: 'header-component',
  templateUrl: 'public/pages/common/header.component.html',
  directives: [RouterLink],
  providers: [UserService]
})

export class HeaderComponent{
  public id;
  public searchQuery;
    constructor(public userService:UserService, public router:Router){
      this.id = this.userService.getId();
    }

    doLogout(){
      this.userService.logout();
      this.router.navigate(['Login']);
    }

    doSearch(){
      this.router.navigateByUrl('/search/'+this.searchQuery);
    }
}
