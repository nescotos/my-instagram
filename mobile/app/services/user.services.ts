import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
var appSettings = require("application-settings");
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {Config} from '../config';

@Injectable()
export class UserService {
  constructor(public http : Http){}

  login(username:string, password:string){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      this.http.post(Config.APIURL + '/login', JSON.stringify({
        username: username, password: password
      }), {headers : headers}).map(res => res.json())
      .subscribe(res => {
        if(res.code == "404" || res.code == "500"){
          console.error('Brutal error');
        }else{
          observable.next(res);
        }
      })
    })
  }

  logout(){
    appSettings.remove("token");
  }
  getToken(){
    return(appSettings.getString("token"));
  }
  isAuth(){
    if(this.getToken()){
      return true;
    }
    return false;
  }
}
