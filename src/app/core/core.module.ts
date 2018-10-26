import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule }    from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { RouterModule } from '@angular/router';

export const TranslateHttpLoaderFactory = (http: HttpClient) => (new TranslateHttpLoader(http, "/tracking/assets/locales/", ".json"))

@NgModule({
  imports: [
		CommonModule,
		BrowserModule,
    BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
    VirtualScrollModule,
    RouterModule,
    HttpClientJsonpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
		CommonModule,
		BrowserModule,
    BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
    VirtualScrollModule,
    RouterModule,
    HttpClientJsonpModule,
    TranslateModule,
  ],
  providers: []
})

export class CoreModule {}
