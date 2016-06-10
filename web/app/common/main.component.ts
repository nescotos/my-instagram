import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../services/photos.services';
import {UserService} from '../services/user.services';
import {RouterLink} from '@angular/router-deprecated';
import {TimeAgoPipe} from 'angular2-moment/TimeAgoPipe';
//We need this for SocketIO
declare var io:any;

@Component({
  selector : 'main-component',
  pipes : [TimeAgoPipe],
  templateUrl: 'public/pages/common/main.component.html',
  directives : [RouterLink],
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
      context.newPhotos.push(data);
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

  getProfileImageURL(id){
    return '/api/v1/profile/' + id + '?token=' + this.userService.getToken();
  }

  likePhoto(array, photoId){
    this.userService.like(photoId).subscribe(like => {
      if(like['success']){
        array.push(this.userService.getId());
      }else{
        alert('Error');
      }
    })
  }

  unlikePhoto(array, photoId){
    this.userService.unlike(photoId).subscribe(like => {
      if(like['success']){
        for(let i = 0; i < array.length; i++){
          if(array[i] == this.userService.getId()){
            array.splice(i, 1);
          }
        }
      }else{
        alert('Error');
      }
    })
  }

  canLike(array){
    return (array.indexOf(this.userService.getId()) < 0);
  }
}
