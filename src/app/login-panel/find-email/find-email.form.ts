import { Injectable } from '@angular/core'
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Injectable()
export class FindEmailForm {
    form: FormGroup
    public valider:RegexValidators;
    public vmsg = new ValidMsgs();

    constructor(
      private fb: FormBuilder,
    ) {
        this.valider = new RegexValidators(),
        this.form= this.fb.group({
          username: ['', [
            Validators.required,
            Validators.minLength(this.valider.usernameMin),
            Validators.maxLength(this.valider.usernameMax),
          ]],

          password_a: ['', [Validators.required]],
          password_q: ['', [Validators.required]],

          birthday: ['', [
              Validators.required,
          ]],

          phoneNum: ['', [
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
        });
    }
}

export class ValidatorMSG {
  value: string;
  dirty: string;
  invalid: string;
  valid: string;
  invalidMin: string;
  invalidMax: string;
  invalidPattern: string;
  require: string;


  constructor() {
    this.value= '';
    this.dirty= '';
    this.invalid= '';
    this.valid= '';
    this.invalidMin= '';
    this.invalidMax= '';
    this.invalidPattern= '';
    this.require= '입력이 되지 않았습니다!';
  }
}

export class RegexValidators {
  usernameMin:number = 1;
  usernameMax:number = 20;
  passwordMin:number = 8;
  passwordMax:number = 16;
  phoneNumMin:number = 10;
  phoneNumMax:number = 11;

  pureEmail =/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  purePassword = /^(?=.*[a-zA-Z])(?=.*[!@#%^&*+=-]).*$/;
  purePhoneNumber = /^0(?=.*[0-9]).*$/;
};


@Injectable()
export class ValidMsgs {

  valider: RegexValidators
  usernameLabel: ValidatorMSG;
  birthLabel: ValidatorMSG;
  phoneNumLabel : ValidatorMSG;
  jobLabel: ValidatorMSG;
  deptLabel: ValidatorMSG;
  password_a: ValidatorMSG;
  password_q: ValidatorMSG;

  constructor() {
    this.valider= new RegexValidators();
    this.usernameLabel = new ValidatorMSG();
    this.birthLabel = new ValidatorMSG();
    this.phoneNumLabel =  new ValidatorMSG();
    this.jobLabel =   new ValidatorMSG();
    this.deptLabel =  new  ValidatorMSG();
    this.password_a =  new  ValidatorMSG();
    this.password_q =  new  ValidatorMSG();

    this.usernameLabel.value = '치료자님의 이름을 입력해주세요.';
    this.usernameLabel.invalidMin = "길이가 너무 짧습니다! (" + this.valider.usernameMin + "자 이상)";
    this.usernameLabel.invalidMax = "길이가 너무 깁니다! (" + this.valider.usernameMax + "자 이하)";

    this.birthLabel.value = '치료자님의 생년월일을 입력해주세요.';

    this.phoneNumLabel.value = '치료자님의 휴대전화 번호를 "-" 없이 입력해주세요.';
    this.phoneNumLabel.valid = this.phoneNumLabel.value;
    this.phoneNumLabel.invalidPattern = '적절한 핸드폰 번호가 아닙니다! ("-" 없이 숫자로만 이루어져야 합니다.)';
    this.phoneNumLabel.invalidMin = "길이가 너무 짧습니다! (" + this.valider.phoneNumMin + "자 이상)";
    this.phoneNumLabel.invalidMax = "길이가 너무 깁니다! (" + this.valider.phoneNumMax + "자 이하)";

    this.jobLabel.value = '치료자님께서 현재 종사하고 있는 직종을 입력하세요';
    this.deptLabel.value = '치료자님께서 현재 소속되어 있는 소속기관을 입력하세요';
  }
}
