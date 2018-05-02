import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';
import {ComponentsModule} from './shared/modules/components.module';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';
import {ForgotModule} from './forgot/forgot.module';
import {NotFoundModule} from './not-found/not-found.module';
import {ErrorModule} from './error/error.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AppRoutingModule,
    LoginModule,
    RegisterModule,
    ForgotModule,
    NotFoundModule,
    ErrorModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
