import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID, APP_ID, PLATFORM_ID, Inject} from '@angular/core';
import {registerLocaleData, isPlatformBrowser} from '@angular/common';
import {RouteReuseStrategy} from '@angular/router';
import localeZh from '@angular/common/locales/zh';
import { TransferHttpCacheModule } from '@nguniversal/common';

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
    BrowserModule.withServerTransition({appId: 'partner'}),
    BrowserAnimationsModule,
    ComponentsModule,
    TransferHttpCacheModule,
    BrowserTransferStateModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'zh'
  },
  // {
  //   provide: RouteReuseStrategy,
  //   useClass: AppRouteReuseStrategy
  // },
    SubjectService,
    GlobalStateService,
    RouteGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {

    let platformInfo = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';

    console.log(`Running ${platformInfo} with appId = ${appId}`);
  }
}
