import {Component} from '@angular/core';
import {UserService} from '../services/user.services';
import {Router} from '@angular/router-deprecated';

@Component({
  selector: 'header-component',
  templateUrl: 'public/pages/common/header.component.html',
  providers: [UserService]
})

export class HeaderComponent{

    constructor(public userService:UserService, public router:Router){

    }

    doLogout(){
      this.userService.logout();
      this.router.navigate(['Login']);
    }
}
