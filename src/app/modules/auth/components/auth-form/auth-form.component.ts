import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls:['./auth-form.component.scss'],
})

export class AuthFormComponent {
  @Input('class') customClass?: string
}
