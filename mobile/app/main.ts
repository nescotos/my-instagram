// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from "./app.component";
import {NS_ROUTER_PROVIDERS} from 'nativescript-angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
nativeScriptBootstrap(AppComponent, [HTTP_PROVIDERS, NS_ROUTER_PROVIDERS]);
