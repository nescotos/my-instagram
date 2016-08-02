import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Utils} from '../../utils/utils';
import {ObservableArray} from "data/observable-array";
import {UserService} from '../../services/user.services';
import {PhotoService} from '../../services/photo.services';
@Component({
    selector: 'main-page',
    templateUrl: './home/main/main.component.html',
    providers: [Utils, UserService, PhotoService]
})

export class MainComponent implements OnInit{

    public photos;
    public loading = true;
    public segmentedBarItems: [
               {title: 'HELLO'},
               {title: 'second'},
               {title: 'third'},
               {title: 'fourth'}
           ];
     public selectedIndex = 0;
    constructor(public utils: Utils, public userService: UserService, public photoService: PhotoService) { }

    ngOnInit(){
      this.photoService.getAllPhotosByWall()
      .subscribe(photos => {
          // let myString = JSON.stringify(photos);
          // this.photos = JSON.parse(myString);
          this.photos = photos;
          this.loading = false;
      }, error => {
        alert('Error');
      });
    }

    showPhotos(){
      alert(this.getPhotos());
    }

    getPhotos(){
      return this.photos[0];
    }


}
