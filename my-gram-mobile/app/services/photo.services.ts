import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Config} from '../config';
import {Http, Headers, Response} from "@angular/http";
import {Router} from '@angular/router';
import {UserService} from './user.services';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class PhotoService {
    constructor(public http: Http, public router: Router, public userService: UserService) {

    }

    getAllPhotosByWall() {
        return new Observable(observable => {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", this.userService.getToken());
            this.http.get(Config.APIV1URL + '/photos', { headers: headers }).map(res => res.json())
                .subscribe(res => {
                    if (res.code == "404" || res.code == "500") {
                        console.error('Brutal error');
                    } else if (res.code == "403") {
                        console.log('Unauthorized!')
                    } else {
                        observable.next(res);
                    }
                },
                error => {
                    //Checking if error 403
                    if(error.status === 403){
                      //We have no valid token, then redirect to login an clean the token field
                      this.userService.logout();
                    }

                })
        })
    }


    getFullPhoto(id) {
        return new Observable(observable => {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            this.http.get('/api/v1/photoDisplay/' + id, { headers: headers }).map(res => res.json())
                .subscribe(res => {
                    if (res.code == "404" || res.code == "500") {
                        console.error('Brutal error');
                    } else if (res.code == "403") {
                        console.log('Unauthorized!')
                    } else {
                        observable.next(res);
                    }
                },
                error => {
                    //Checking if error 403
                    if (error.status === 403) {
                        //We have no valid token, then redirect to login an clean the token field
                        localStorage.removeItem("token");
                        localStorage.removeItem("id");
                        localStorage.removeItem("username");
                        this.router.navigateByUrl('/login');
                    }

                })
        })
    }
}
