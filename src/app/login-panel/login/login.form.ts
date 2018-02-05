import { Injectable } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Injectable()
export class LoginForm {
    loginForm: FormGroup
    constructor(
      private fb: FormBuilder,
    ) {
          this.loginForm = this.fb.group({
          email: ['', [
            Validators.required,
          ]],
          password: ['', [
            Validators.required,
          ]],
      });
    }
}
