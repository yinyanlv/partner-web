import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {RouteReuseStrategy} from '@angular/router';
import localeZh from '@angular/common/locales/zh';

import {AppRouteReuseStrategy} from './shared/etc/app-route-reuse-strategy';
import {ComponentsModule} from './shared/modules/components.module';
import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';

import {SubjectService} from './shared/services/subject.service';
import {GlobalStateService} from './shared/services/global-state.service';
import {RouteGuardService} from './shared/services/route-guard.service';

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
  }, {
    provide: RouteReuseStrategy,
    useClass: AppRouteReuseStrategy
  },
    SubjectService,
    GlobalStateService,
    RouteGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
