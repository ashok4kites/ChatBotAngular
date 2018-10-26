import { Injectable, Inject } from "@angular/core";
import { CompanyContextService, SecurityService } from "frontend-client-shared-module";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class CompanyConfigGuard implements CanActivate {

  constructor(
    private companyContextService: CompanyContextService,
    private securityService: SecurityService,
    @Inject(DOCUMENT) private document: any
  ){}

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Promise<boolean>|boolean {
    const user = this.securityService.currentUser;
    let companyId = user.companyId || this.companyContextService.getCompanyContext();
    if(companyId){
      return new Promise((resolve) => {
        this.companyContextService.setSessionCompany(companyId)
          .then((response) => {
            resolve(true);
          })
          .catch((err) => {
            this.redirectTo('/tracking/error/0?from=home');
            resolve(false);
          })
      })
    }
    this.redirectTo('/tracking/error/0?from=home');
    return false;
  }

  private redirectTo(path) {
    this.document.location.href = path;
  }
}
