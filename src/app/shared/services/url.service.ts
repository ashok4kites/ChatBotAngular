import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { CompanyContextService } from 'frontend-client-shared-module';
import { environment } from "environments/environment";

@Injectable()
export class URLService {

  constructor(
    private companyContextService: CompanyContextService,
    @Inject(DOCUMENT) private document: any
  ){}

  public redirectTo(path:string):void {
    this.document.location.assign(this.legacyUrl + path)
  }

  public getRedirectURL(path:string):string {
    return (this.legacyUrl + path);
  }

  public get legacyUrl():string {
    return this.document.location.origin;
  }

}