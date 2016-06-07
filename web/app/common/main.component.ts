import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../services/photos.services';
import {UserService} from '../services/user.services';
//We need this for SocketIO
declare var io:any;

@Component({
  selector : 'main-component',
  templateUrl: 'public/pages/common/main.component.html',
  providers: [PhotoService, UserService]
})

export class MainComponent implements OnInit {
  public photos;
  public socket:any;
  public isNewPhotos;
  public newPhotos:any[] = [];
  constructor(public photoService : PhotoService, public userService : UserService){
    var context = this;
    this.isNewPhotos = false;
    this.socket = io();
    this.socket.on('photo:received', function(data){
      context.newPhotos.unshift(data);
      context.isNewPhotos = true;
    });
    //Joining to socket
    this.joinSocket();
  }

  ngOnInit(){
    this.photoService.getAllPhotosByWall()
    .subscribe(photos => {
      if(photos){
        this.photos = photos;
      }
    }, error => {
      alert('Error');
    });
  }

  mergeArrays(){
    for(var i = 0; i < this.newPhotos.length; i++){
      this.photos.unshift(this.newPhotos[i]);
    }
    this.newPhotos = [];
    this.isNewPhotos = false;
  }

  joinSocket(){
    this.socket.emit("login", {token : this.userService.getToken()});
  }
}
