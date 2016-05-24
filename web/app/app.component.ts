import {Component} from '@angular/core';
import {HomeComponent} from './home.component';

@Component({
  selector: 'my-instagram',
  template: '<home-component></home-component>',
  directives: [HomeComponent]
})

export class App{

}
