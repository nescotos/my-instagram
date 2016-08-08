import {Injectable} from '@angular/core';
import {Config} from '../config';
import {UserService} from './user.services';

@Injectable()
export class Util{
  constructor(public userService : UserService){}

  getFullURL(routeName:string, id:string){
    return Config.APIURL + '/' + routeName + '/' + id;
  }

  getProfileImageURL(id){
    return Config.APIV1URL + '/profile/' + id + '?token=' + this.userService.getToken();
  }
}
