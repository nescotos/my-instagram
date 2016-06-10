import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Router} from '@angular/router-deprecated';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class CommentService{
  constructor(public http: Http, public router : Router){

  }
  sendComment(photoId, comment){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("x-access-token", localStorage.getItem("token"));
      this.http.post('/api/v1/comment/' + photoId, JSON.stringify({
        content : comment
      }) ,{headers : headers}).map(res => res.json())
      .subscribe(res => {
        //Retrieving the response
        observable.next(res);
      },error => {
        //Checking if error 403
        if(error.status === 403){
          //We have no valid token, then redirect to login an clean the token field
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          this.router.navigateByUrl('/login');
        }
      });
    });
  }
}
