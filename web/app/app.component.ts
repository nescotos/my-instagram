import {Component} from '@angular/core';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';

@Component({
  selector: 'my-instagram',
  template: '<login-component></login-component>',
  directives: [HomeComponent, LoginComponent]
})

export class App{

}
