import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from 'app/core/core.module';

import { ErrorFrameComponent } from './components/error-frame/error-frame.component';

import { ErrorCodesPage } from './pages/error-codes/error-codes.page';


import { ROUTES } from './error-pages.routes'
import { URLService } from '../../services/url.service';

@NgModule({
  imports:[
    RouterModule.forRoot(ROUTES, { useHash: false }),
    CommonModule,
    CoreModule,
  ],
  declarations: [
    ErrorFrameComponent,
    ErrorCodesPage,

  ],
  exports: [
    RouterModule,
    ErrorCodesPage

  ],
  providers: [
    URLService
  ],
  bootstrap: []
})
export class ErrorPagesModule { }
