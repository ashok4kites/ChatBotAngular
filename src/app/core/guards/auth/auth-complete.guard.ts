import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SecurityService } from 'frontend-client-shared-module';

@Injectable()
export class AuthCompleteGuard implements CanActivate {

  constructor(
    private router: Router,
    private securityService: SecurityService
  ){

  }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    let isAllowed = this.securityService.isAuthenticated()
    if(isAllowed){
      this.router.navigate(['/athena'])
      return false
    }
    return true
  }
}
