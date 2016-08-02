import {Component} from '@angular/core';
import {Camera} from 'ionic-native';
import {UserService} from '../../services/user.services';
import {NavController} from 'ionic-angular';
import {Login} from '../login/login';

@Component({
  templateUrl: 'build/pages/index/index.html',
  providers: [UserService]
})
export class Index {

  public base64Image:string;

  constructor(public userService : UserService, public nav : NavController) {
    if(!this.userService.isAuth()){
      this.nav.setRoot(Login);
      //this.nav.push(Login);
    }
  }

  takePicture(){
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

  getPicture(){
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
