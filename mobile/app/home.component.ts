import {Component} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {PhotoService} from './services/photo.services';
import {SocketService} from './services/socket.services';
var appSettings = require("application-settings");
var cameraModule = require("camera");
var enums = require("ui/enums");
@Component({
  selector: 'home-component',
  templateUrl: './views/home.component.html',
  providers: [PhotoService, SocketService]
})

export class HomeComponent{

  public description:string;

  constructor(public router:Router, public photoService:PhotoService, public socket:SocketService){
  }

  public joinSocket(){
        this.socket.joinWatchSocket();
  }
  public goLogin(){
    this.router.navigate(['Login']);
  }

  public getToken(){
    if(appSettings.getString("token")){
      alert(appSettings.getString("token"));
    }else{
      alert("No token!");
    }
  }
  public takePhoto(){
    var vm = this;
     cameraModule.takePicture({width: 500, height: 500, keepAspectRatio: true}).then(function(picture) {
       let rawData = picture.toBase64String(enums.ImageFormat.jpeg, 100);
       vm.sendPhoto(rawData);
     });
  }
  public sendPhoto(rawData){
    this.photoService.sendPhoto(rawData, this.description)
     .subscribe(response => {
       if(response){
         alert(response);
       }
     }, error => {
       alert('Error');
     });
  }
}
