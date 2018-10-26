import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'frontend-client-shared-module';
import { UIModule } from 'app/shared/ui.module';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginPage } from './pages/login/login.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { ResetPasswordPage } from './pages/reset-password/reset-password.page';
import { TwoFactorAuthenticationPage } from './pages/two-factor-authentication/two-factor-authentication.page';
import { AuthFormFactory } from "app/modules/auth/models/forms/auth-form.factory";
import { HttpClientModule } from '@angular/common/http';

import { environment } from "environments/environment"

@NgModule({
  imports:[
    CoreModule,
    SharedModule.forRoot({ environment }),
    UIModule,
    HttpClientModule,
  ],
  declarations: [
    AuthFormComponent,
    FooterComponent,
    LoginPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    TwoFactorAuthenticationPage
  ],
  exports: [
    LoginPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    TwoFactorAuthenticationPage
  ],
  providers: [
    AuthFormFactory
  ]
})
export class AuthModule { }
