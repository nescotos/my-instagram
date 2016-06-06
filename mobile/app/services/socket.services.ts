import {Injectable} from '@angular/core';
var SocketIO = require('nativescript-socket.io');
import {Config} from '../config';
var appSettings = require("application-settings");
@Injectable()
export class SocketService{
  public socket =  SocketIO.connect(Config.APIURL);
  public token;
  constructor(){
    this.socket.on('connect', function(){
      console.log('Connected to Socket');
    });
    if(appSettings.getString("token")){
      this.token = appSettings.getString("token");
    }else{
      alert("Redirect to login...");
    }
  }

  joinWatchSocket(){

    this.socket.emit('login', {token : this.token});
  }
}
