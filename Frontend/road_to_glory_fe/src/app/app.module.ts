import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameObjectModule } from './modules/game_object/game_object.module';
import { AuthModule } from './modules/auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommunicationModule } from './modules/communication/communication.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './modules/auth/interceptors/jwt.interceptor';
//import { authGuard } from './modules/auth/guards/auth.guard';
import { AuthGuard } from './modules/auth/guards/auth1.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommunicationModule,
    BrowserModule,
    AppRoutingModule,
    GameObjectModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
