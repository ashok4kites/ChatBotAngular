import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SecurityService } from 'frontend-client-shared-module'
import { UserResourceService } from 'frontend-client-shared-module'
import { AuthFormFactory } from "app/modules/auth/models/forms/auth-form.factory"

@Component({
  selector: 'login-page',
  styleUrls:['./login.page.scss'],
  templateUrl: './login.page.html',
})

export class LoginPage implements OnInit {
  public loginForm: FormGroup

  constructor(
    private securityService: SecurityService,
    private userResourceService: UserResourceService,
    private authFormFactory: AuthFormFactory
  ){}

  ngOnInit(){
    this.loginForm = this.authFormFactory.createLoginForm()
  }

  get validateEmail() {
    if(!this.loginForm) {
      return false;
    }
    let form = this.loginForm;
    return ((form.dirty || form.touched) &&
      form.controls['email'].hasError('required') ||
      form.controls['email'].hasError('email')
    );
  }

  onLoginSubmit(){
    this.securityService.login(this.loginForm.value)
    .then(response => {
      // TODO: Two Factor Authentication if required
    })
  }

}
