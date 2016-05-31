import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {Config} from '../config';
var appSettings = require("application-settings");
@Injectable()
export class PhotoService {

  constructor(public http:Http){

  }

  sendPhoto(rawData, description){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("x-access-token", appSettings.getString("token"));
      this.http.post(Config.APIV1URL + '/photo', JSON.stringify({
        rawData: rawData, description: description
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
}
