import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserResourceService } from 'frontend-client-shared-module';
import { AuthFormFactory } from "app/modules/auth/models/forms/auth-form.factory"

@Component({
  selector: 'forgot-password-page',
  styleUrls:['./forgot-password.page.scss'],
  templateUrl: './forgot-password.page.html',
})

export class ForgotPasswordPage implements OnInit {
  public forgotPassword: FormGroup

  constructor(
    private userResource: UserResourceService,
    private authFormFactory: AuthFormFactory
  ) {}

  goBack(route) {
    this.userResource.routeTo(route);
  }

  ngOnInit(){
    this.forgotPassword = this.authFormFactory.passwordReset()
  }

  resetPasswordViaEmail() {
    this.userResource.sendPasswordViaEmail(this.forgotPassword.value).then((response) => {
      this.userResource.routeTo('login');
    });
  }

  get validateEmail() {
    if(!this.forgotPassword) {
      return false;
    }
    let form = this.forgotPassword;
    return ((form.dirty || form.touched) &&
      form.controls['email'].hasError('required') ||
      form.controls['email'].hasError('email')
    );
  }

}
