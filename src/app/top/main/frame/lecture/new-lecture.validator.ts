import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';



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
  titleMin:number = 1;
  titleMax:number = 30;
};


@Injectable()
export class ValidMsgs {

  titleLabel: ValidatorMSG;

  constructor(private valider: RegexValidators)
  {
    this.titleLabel = new ValidatorMSG();

    this.titleLabel.value = '치료자님의 이름을 입력해주세요.';
    this.titleLabel.invalidMin = "길이가 너무 짧습니다! (" + this.valider.titleMin + "자 이상)";
    this.titleLabel.invalidMax = "길이가 너무 깁니다! (" + this.valider.titleMax + "자 이하)";
    this.titleLabel.invalid = "동일한 이름의 교육이 존재합니다.";
  }
}
