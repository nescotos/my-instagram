import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {User} from '../classes/user.ts';
import {Http, Headers, Response} from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class PhotoService {
  constructor(public http : Http){

  }

  getAllPhotosByWall(){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("x-access-token", localStorage.getItem("token"));
      this.http.get('/api/v1/photos', {headers : headers}).map(res => res.json())
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
