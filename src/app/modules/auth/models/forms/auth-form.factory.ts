import { Injectable, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Injectable()

export class AuthFormFactory {
  constructor(
    private _formBuilder: FormBuilder
  ){}

  createLoginForm(): FormGroup{
    return this._formBuilder.group({
      email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur'}),
      password: ['', [ Validators.required ]],
      remember: [true, [ Validators.required ]]
    })
  }

  create2faVerifyForm(): FormGroup{
    return this._formBuilder.group({
      verifyCode: ['', [ Validators.required ]]
    })
  }

  passwordReset() : FormGroup {
    return this._formBuilder.group({
      email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur'})
    })
  }
}
