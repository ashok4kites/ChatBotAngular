import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';

import { AuthGuard } from "./guards/auth/auth.guard";
import { AuthValidateGuard } from "./guards/auth/auth-validate.guard";
import { AuthCompleteGuard } from "./guards/auth/auth-complete.guard";
import { CompanyConfigGuard } from './guards/company-config/company-config.gaurd';

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { useHash: false })
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AuthValidateGuard,
        AuthCompleteGuard,
        CompanyConfigGuard
    ]
})

export class RouteModule {}
