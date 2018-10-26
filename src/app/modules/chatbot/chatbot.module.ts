import { NgModule } from '@angular/core';

import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'frontend-client-shared-module';
import { UIModule } from 'app/shared/ui.module';
import {ChatService} from 'app/shared/services/chat.service';

import { environment } from "environments/environment"
import { ChatApplicationPage } from "./pages/chatbotpage.component";
@NgModule({
  imports:[
    CoreModule,
    SharedModule.forRoot({ environment }),
    UIModule
  ],
  declarations: [
    ChatApplicationPage
  ],
  exports: [
    ChatApplicationPage
  ],
  providers: [
    ChatService
  ]
})
export class ChatBotAppModule { }
