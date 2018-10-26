import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { SecurityService } from 'frontend-client-shared-module';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private securityService: SecurityService,
    @Inject(DOCUMENT) private document: any
  ){

  }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    let isAllowed = this.securityService.isAuthenticated()
    if(!isAllowed){
      this.redirectToLogin()
    }
    return isAllowed
  }

  redirectToLogin(): void {
    this.document.location.href = "/#/signin";
  }

}
