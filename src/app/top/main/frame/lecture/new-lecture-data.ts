import { Injectable } from '@angular/core'
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidMsgs, RegexValidators } from "./new-lecture.validator";

@Injectable()
export class NewLectureData {
    lectureForm: FormGroup
    defaultPageNum:number = 1;
    constructor(
      private fb: FormBuilder,
      private valider: RegexValidators,
    ) {
          this.lectureForm= this.fb.group({
          title: ['', [
            Validators.required,
            Validators.minLength(this.valider.titleMin),
            Validators.maxLength(this.valider.titleMax),
          ]],
          loadedTitle: ['', [
            Validators.required,
          ]],
          asTitle: ['', [
            Validators.required,
            Validators.minLength(this.valider.titleMin),
            Validators.maxLength(this.valider.titleMax),
          ]],
          editor: ['', [
          ]],
          page: [this.defaultPageNum, [
          ]],
      }, {updateOn: 'blur'});
    }
}


export interface Lecture {
  idLECTURE :number
  idEXPERT_USER :number
  page_no :number
  type :number
  status :number
  title :string;
  ADD_TIME:string;
  UPDATE_TIME :string;
}
