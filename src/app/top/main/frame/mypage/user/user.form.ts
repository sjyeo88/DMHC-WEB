import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RegexValidators } from './../../../../../login-panel/register/register.validator'

@Injectable()
export class UserForm {
  public deptOpt = [];
  public jobOpt = [];
  public form:FormGroup;
  public valider:RegexValidators;

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
    })
  }




}
