import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { RegexValidators, ValidMsgs } from './../../../../../login-panel/register/register.form';

@Injectable()
export class UserForm {
  public deptOpt = [];
  public jobOpt = [];
  public form:FormGroup;
  public valider:RegexValidators;
  public validMsg =  new ValidMsgs();

  constructor(
    public fb:FormBuilder,
  ) {
    this.valider = new RegexValidators();
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.valider.pureEmail)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(this.valider.purePhoneNumber)
      ]],
      dept: [0, []],
      job: [0, []],
      password: ['', [Validators.required]],

      license : [null, [Validators.required]],


      passwordGroup: this.fb.group({
        newPassword: ['', [
          Validators.required,
          Validators.minLength(this.valider.passwordMin),
          Validators.maxLength(this.valider.passwordMax),
          Validators.pattern(this.valider.purePassword),
        ]],
        newPasswordCheck: ['', [
          Validators.required,
          Validators.minLength(this.valider.passwordMin),
          Validators.maxLength(this.valider.passwordMax),
          Validators.pattern(this.valider.purePassword),
        ]],
      }, {validator: PasswordValid.match}),

      password_q: ['', [Validators.required]],
      password_a: ['', [Validators.required]],
      })
  }




}


export class PasswordValid {
    static match(form: AbstractControl) {
      const password = form.get('newPassword').value;
      const passwordCheck = form.get('newPasswordCheck').value;
      if(password !== passwordCheck) {
        return {match: {password, passwordCheck}};
      } else {
        return null;
      }
    }
}
