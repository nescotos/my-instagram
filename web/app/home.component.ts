import {Component} from '@angular/core';
import {HeaderComponent} from './common/header.component';

@Component({
  selector: 'home-component',
  template: '<header-component></header-component>',
  directives: [HeaderComponent]
})

export class HomeComponent{

}
