import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../services/photos.services';

@Component({
  selector : 'main-component',
  templateUrl: 'public/pages/common/main.component.html',
  providers: [PhotoService]
})

export class MainComponent implements OnInit {
  public photos;
  constructor(public photoService : PhotoService){

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
}
