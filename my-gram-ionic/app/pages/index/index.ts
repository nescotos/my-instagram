import {Component} from '@angular/core';
import {Camera} from 'ionic-native';
import {UserService} from '../../services/user.services';
import {NavController} from 'ionic-angular';
import {Login} from '../login/login';
import {User} from '../user/user';
import {TimeAgoPipe} from 'angular2-moment';
import {PhotoService} from '../../services/photo.services';
import {Util} from '../../services/utils.services';

@Component({
  templateUrl: 'build/pages/index/index.html',
  providers: [UserService, PhotoService, Util],
  pipes: [TimeAgoPipe]
})
export class Index {

  public base64Image: string;
  public photos;
  public profile = User;
  public selection = "MAIN";

  constructor(public userService: UserService, public nav: NavController, public photoService: PhotoService, public util: Util) {
    if (!this.userService.isAuth()) {
      this.nav.setRoot(Login);
    }
  }

  doLogout(){
    this.userService.logout();
    this.nav.setRoot(Login);
  }


  selectProfile() {
    this.selection = "PROFILE";
  }

  ngOnInit() {
    this.photoService.getAllPhotosByWall()
      .subscribe(photos => {
        if (photos) {
          this.photos = photos;
        }
      }, error => {
        alert('Error');
      });
  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  getPicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 500,
      targetHeight: 500
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

}
