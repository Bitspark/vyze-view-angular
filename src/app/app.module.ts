import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {VyzeModule} from 'ng-vyze';
import {MyViewComponent} from './my-view.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    MyViewComponent
  ],
  imports: [
    BrowserModule,
    VyzeModule,
  ],
  providers: [
    {provide: 'systemUrl', useValue: 'http://localhost:9131/api'},
    {provide: 'streamUrl', useValue: 'ws://localhost:9131/api'},
    {provide: 'apiUrl', useValue: 'http://localhost:9150'},
  ],
  bootstrap: []
})
export class AppModule {

  constructor(private injector: Injector) {
    const el = createCustomElement(MyViewComponent, {injector});
    customElements.define(environment.tag, el);
  }

  ngDoBootstrap() {
  }

}
