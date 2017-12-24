import { Injectable } from '@angular/core'
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidMsgs, RegexValidators, PasswordValid } from "../login-panel/register/register.validator";

@Injectable()
export class RegistData {
    registForm: FormGroup
    constructor(
      private fb: FormBuilder,
      private valider: RegexValidators,
    ) {
          this.registForm = this.fb.group({
          username: ['', [
            Validators.required,
            Validators.minLength(this.valider.usernameMin),
            Validators.maxLength(this.valider.usernameMax),
          ]],
          email: ['', [
            Validators.required,
            Validators.pattern(this.valider.pureEmail),
          ]],
          passwordGroup: this.fb.group({
            password: ['', [
              Validators.required,
              Validators.minLength(this.valider.passwordMin),
              Validators.maxLength(this.valider.passwordMax),
              Validators.pattern(this.valider.purePassword),
            ]],
            password_check: ['', [
              Validators.required,
              Validators.minLength(this.valider.passwordMin),
              Validators.maxLength(this.valider.passwordMax),
              Validators.pattern(this.valider.purePassword),
            ]],
          }, {validator: PasswordValid.match}),

          birthday: ['', [
              Validators.required,
          ]],

          phone_num: ['', [
            Validators.required,
            Validators.pattern(this.valider.purePhoneNumber),
            Validators.minLength(this.valider.phoneNumMin),
            Validators.maxLength(this.valider.phoneNumMax),
          ]],

          job: ['', [
            Validators.required,
          ]],

          dept: ['', [
            Validators.required,
          ]],
      }, {updateOn: 'blur'});
    }
}


@Injectable()
export class LoginData {
    loginForm: FormGroup
    constructor(
      private fb: FormBuilder,
      private valider: RegexValidators,
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
