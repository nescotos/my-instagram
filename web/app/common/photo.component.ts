import {Component} from '@angular/core';
import {PhotoService} from '../services/photos.services';
import {CommentService} from '../services/comment.services';
import {UserService} from '../services/user.services';
import {RouteParams, RouterLink} from '@angular/router-deprecated';
import {TimeAgoPipe} from 'angular2-moment/TimeAgoPipe';

@Component({
  selector : 'photo-component',
  pipes: [TimeAgoPipe],
  templateUrl : 'public/pages/common/photo.component.html',
  directives : [RouterLink],
  providers: [PhotoService, UserService, CommentService]
})

export class PhotoComponent{

  public photo;
  public myComments:any[] = [];
  public comment;
  constructor(public params : RouteParams, public photoService : PhotoService, public userService : UserService, public commentService : CommentService){
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

  createComment(){
    this.commentService.sendComment(this.photo['_id'], this.comment).subscribe(comment => {
      if(comment['success']){
        let myComment = {content : this.comment, createdAt : new Date};
        this.myComments.push(myComment);
        this.comment = "";
      }else{
        alert('Error');
      }
    })
  }

  likePhoto(){
    this.userService.like(this.photo['_id']).subscribe(like => {
      if(like['success']){
        this.photo['likes'].push(this.userService.getId());
      }else{
        alert('Error');
      }
    })
  }

  unlikePhoto(){
    this.userService.unlike(this.photo['_id']).subscribe(like => {
      if(like['success']){
        for(let i = 0; i < this.photo['likes'].length; i++){
          if(this.photo['likes'][i] == this.userService.getId()){
            this.photo['likes'].splice(i, 1);
          }
        }
      }else{
        alert('Error');
      }
    })
  }

  canLike(){
    return (this.photo['likes'].indexOf(this.userService.getId()) < 0);
  }

}
