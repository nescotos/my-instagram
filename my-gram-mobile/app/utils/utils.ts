import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Config} from '../config';
import {UserService} from '../services/user.services';
@Injectable()
export class Utils{
  constructor(public router:Router, public userService : UserService){

  }

  public redirectTo(route:string){
    this.router.navigate([route]);
  }

  public getImageURL(id){
    return Config.APIURL + '/photo/' + id; 
  }
}
