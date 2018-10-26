import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserResourceService } from 'frontend-client-shared-module';
import { AuthFormFactory } from "app/modules/auth/models/forms/auth-form.factory"

@Component({
  selector: 'two-factor-authentication-page',
  styleUrls:['./two-factor-authentication.page.scss'],
  templateUrl: './two-factor-authentication.page.html',
})

export class TwoFactorAuthenticationPage implements OnInit{
  public verify2faEmail: FormGroup;
  private selectedAuthType: string;
  public showForm: boolean = false;

  constructor(
    private userResource: UserResourceService,
    private authFormFactory: AuthFormFactory
  ) {}

  ngOnInit(){
    this.verify2faEmail = this.authFormFactory.create2faVerifyForm()
  }

  goBack(route) {
    this.userResource.routeTo(route);
  }

  defaultRadioCheck(type) {
    let submitCount = this.userResource.getCount('email', 'submitCount');
    if(type === 'email' && submitCount < 5) {
      this.selectedAuthType = "email";
      return true;
    }
    else if(type === 'phone' && submitCount > 5){
      this.selectedAuthType = "mobile_app";
      return true;
    }
    return false;
  }

  saveSelectedChange(value) {
    this.selectedAuthType = value;
  }

  sendVerificationCode() {
    this.userResource.sendOTPviaEmail(this.selectedAuthType).then((response) => {
      this.showForm = true;
    }).catch((error) => {
      let submitCount = this.userResource.getCount('email', 'submitCount');
      if(submitCount >= 5) {
        this.showForm = false;
        this.selectedAuthType = 'mobile_app';
      }
      return false;
    });
  }

  verfiy2faViaEmail() {
    let code = this.verify2faEmail.value.verifyCode;
    this.userResource.verifyOTPfromEmail(code).then((response) => {
      // TODO: route to dashboard page on success
    });
  }

  get showVerificationForm(){
    if(!this.verify2faEmail) {
      return false;
    }
    let submitCount = this.userResource.getCount('email', 'submitCount');
    return (this.selectedAuthType === "email" && submitCount < 5 && this.showForm);
  }

}
