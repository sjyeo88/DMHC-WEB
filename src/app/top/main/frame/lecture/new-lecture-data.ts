import { Injectable } from '@angular/core'
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidMsgs, RegexValidators } from "./new-lecture.validator";

@Injectable()
export class NewLectureData {
    lectureForm: FormGroup
    defaultPageNum:number = 1;
    constructor(
      private fb: FormBuilder,
    ) {
          this.lectureForm= this.fb.group({
          title: ['', [
            Validators.required,
          ]],
          editor: ['', [
          ]],
          page: [this.defaultPageNum, [
          ]],
      }, {updateOn: 'blur'});
    }
}
