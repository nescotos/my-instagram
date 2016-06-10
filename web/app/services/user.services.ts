import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {User} from '../classes/user.ts';
import {Http, Headers, Response} from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
  constructor(public http : Http){}

  login(username:string, password:string){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      this.http.post('/login', JSON.stringify({
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
  findUser(userId:string){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("x-access-token", localStorage.getItem("token"));
      this.http.get('/api/v1/user/' + userId,{headers : headers}).map(res => res.json())
      .subscribe(res => {
        if(res.code == "404" || res.code == "500"){
          console.error('Brutal error');
        }else{
          observable.next(res);
        }
      })
    })
  }
  search(query:string){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("x-access-token", localStorage.getItem("token"));
      this.http.get('/api/v1/search/' + query,{headers : headers}).map(res => res.json())
      .subscribe(res => {
        if(res.code == "404" || res.code == "500"){
          console.error('Brutal error');
        }else{
          observable.next(res);
        }
      })
    })
  }

  follow(followingId){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("x-access-token", localStorage.getItem("token"));
      this.http.post('/api/v1/follow/',JSON.stringify({followingId : followingId}),{headers : headers}).map(res => res.json())
      .subscribe(res => {
        if(res.code == "404" || res.code == "500"){
          console.error('Brutal error');
        }else{
          observable.next(res);
        }
      })
    })
  }
  unfollow(followingId){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("x-access-token", localStorage.getItem("token"));
      this.http.post('/api/v1/unfollow/',JSON.stringify({followingId : followingId}),{headers : headers}).map(res => res.json())
      .subscribe(res => {
        if(res.code == "404" || res.code == "500"){
          console.error('Brutal error');
        }else{
          observable.next(res);
        }
      })
    })
  }

  like(photoId){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("x-access-token", localStorage.getItem("token"));
      this.http.post('/api/v1/photo/like',JSON.stringify({photoId : photoId}),{headers : headers}).map(res => res.json())
      .subscribe(res => {
        if(res.code == "404" || res.code == "500"){
          console.error('Brutal error');
        }else{
          observable.next(res);
        }
      })
    })
  }
  unlike(photoId){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("x-access-token", localStorage.getItem("token"));
      this.http.post('/api/v1/photo/unlike',JSON.stringify({photoId : photoId}),{headers : headers}).map(res => res.json())
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
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("username");
  }

  isAuth(){
    if(window.localStorage.getItem("token")){
      return true;
    }
    return false;
  }

  getToken(){
    return window.localStorage.getItem("token");
  }

  getId(){
    return window.localStorage.getItem('id');
  }

  getUsername(){
    return window.localStorage.getItem('username');
  }
}
