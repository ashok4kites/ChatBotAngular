import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { CoreModule } from './core/core.module';
import { SharedModule, LegacyHeaderModule } from 'frontend-client-shared-module';
import { ErrorPagesModule } from 'app/shared/views/error-pages/error-pages.module';
import { AuthModule } from './modules/auth/auth.module';
import { RouteModule } from './core/route.module';
import { UIModule } from './shared/ui.module';
import { AppComponent } from './app.component';
import {ChatBotAppModule} from 'app/modules/chatbot/chatbot.module';
import { environment } from "environments/environment";
import { ngxLeafletModule } from '@fourkites/frontend-client-leaflet-module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    UIModule,
    SharedModule.forRoot({ environment }),
    AuthModule,
    RouteModule,
    ErrorPagesModule,
    LegacyHeaderModule,
    VirtualScrollModule,
    ngxLeafletModule,
    ChatBotAppModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
