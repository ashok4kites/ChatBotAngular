import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { SecurityService } from 'frontend-client-shared-module';

@Injectable()
export class AuthValidateGuard implements CanActivate {

  constructor(
    private router: Router,
    private securityService: SecurityService,
    @Inject(DOCUMENT) private document: any
  ){

  }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    return this.securityService.validateAuthToken().then((response) => {
      if(response.statusCode == 200) {
        return true;
      }
      if(response.statusCode == 403) {
        this.redirectToTwoFactorAuth();
        return false;
      }
    })
    .catch((error) => {
      this.redirectToTwoFactorAuth();
      return false;
    });
  }

  redirectToTwoFactorAuth(): void {
    this.document.location.href = "/#/twoFactorAuthentication";
  }

}
