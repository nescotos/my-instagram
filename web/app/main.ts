import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
