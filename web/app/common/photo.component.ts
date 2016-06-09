import {Component} from '@angular/core';
import {PhotoService} from '../services/photos.services';
import {UserService} from '../services/user.services';
import {RouteParams, RouterLink} from '@angular/router-deprecated';
import {TimeAgoPipe} from 'angular2-moment/TimeAgoPipe';

@Component({
  selector : 'photo-component',
  pipes: [TimeAgoPipe],
  templateUrl : 'public/pages/common/photo.component.html',
  directives : [RouterLink],
  providers: [PhotoService, UserService]
})

export class PhotoComponent{

  public photo;
  constructor(public params : RouteParams, public photoService : PhotoService, public userService : UserService){
    let id = params.get('id');
    this.photoService.getFullPhoto(id).subscribe(photo => {
      if(photo){
        this.photo = photo;
      }
    })

  }

  getProfileImageURL(id){
    return '/api/v1/profile/' + id + '?token=' + this.userService.getToken();
  }

}
