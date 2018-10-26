import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'FourKites - Tracking';

  constructor(
    private translateService: TranslateService,
    private localStorage: LocalStorageService
  ){
    translateService.setDefaultLang('en');
    translateService.use(this.localStorage.retrieve('NG_TRANSLATE_LANG_KEY'));
  }

  ngAfterViewInit() {
  }
}
