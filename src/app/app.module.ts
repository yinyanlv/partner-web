import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeZh from '@angular/common/locales/zh';

import {ComponentsModule} from './shared/modules/components.module';
import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';

registerLocaleData(localeZh);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'zh'
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
