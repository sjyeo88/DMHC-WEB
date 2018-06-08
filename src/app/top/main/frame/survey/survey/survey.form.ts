import { Injectable } from '@angular/core'
import { FormArray, AbstractControl, FormControl,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Title } from '../survey.model'
// import { LectureValidMsgs, LectureRegexValidators } from "./new-lecture.validator";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/observable/from';

class ValidConfig {
  requireMsg = "입력 란을 작성하세요.";
  titleMax:number = 30;
  titleMaxLengthMsg:string = '길이가 너무 깁니다 [' + this.titleMax+ ' 자 이하]'
  titleDuplicateMsg:string = '기존 설문 중 중복된 설문이 있습니다.'
  measureTxtMax:number = 10;
  measureTxtMaxLengthMsg:string = '길이가 너무 깁니다 [' + this.measureTxtMax+ ' 자 이하]'
  ojbectTxtMax:number = 80;
  objectTxtMaxLengthMsg:string = '길이가 너무 깁니다 [' + this.ojbectTxtMax+ ' 자 이하]'
}

@Injectable()
export class SurveyForm {
    titleList:Title[] = [];
    surveyForm: FormGroup
    defaultPageNum:number = 1;
    valider = new ValidConfig();
    constructor(
      private fb: FormBuilder,
    ) {
      this.surveyForm= this.fb.group({
        title: ['', [
          Validators.required,
          Validators.maxLength(this.valider.titleMax),
        ]],
        measure: [2, [
          Validators.required,
        ]],
        measureTextArray: this.fb.array([
          this.fb.group({
            text: ['', [Validators.required]]
          }),
          this.fb.group({
            text: ['', [Validators.required]]
          })
        ]),
        objectArray: this.fb.array([
          this.fb.group({
            text: ['', [Validators.required, Validators.maxLength(this.valider.ojbectTxtMax)]],
            type: [false],
          })
        ])
      });
    }

  setMeasureText(measureValue, arr?:string[]) {
    let measureText = this.surveyForm.controls.measureTextArray as FormArray;
    while (0 !== measureText.length) {measureText.removeAt(measureText.length-1)};
    for (let i=0; i < measureValue; i++) {
      measureText.insert(i,
        this.fb.group({
          text: [arr? arr[i] : '', [Validators.required, Validators.maxLength(this.valider.measureTxtMax)]]
        })
      )
    }
    // console.log(measureText.controls.length);
  }

  insertObjectText(idx, text?, type?, dirty?) {
    let objectText = this.surveyForm.controls.objectArray as FormArray;
    objectText.insert(idx+1,
      this.fb.group({
        text: [text? text : '', [Validators.required, Validators.maxLength(this.valider.ojbectTxtMax)]],
        type: [(type=='TRUE' || type==1 || type==true) ? true : false],
      })
    )
    if(dirty) {
      console.log(objectText.controls[idx+1]);
      (objectText.controls[idx+1] as FormGroup).controls.text.markAsDirty();
    }
    return objectText.controls[idx];
  }

  addObjectText(text?, type?) {
    let objectText = this.surveyForm.controls.objectArray as FormArray;
    objectText.insert(0,
      this.fb.group({
        text: [text? text : '', [Validators.required, Validators.maxLength(this.valider.ojbectTxtMax)]],
        type: [(type=='TRUE') ? true : false],
        // type: [true],
      })
    )
  }

  removeObjectText(idx) {
    let objectText = this.surveyForm.controls.objectArray as FormArray;
    objectText.removeAt(idx);
    return objectText.length
  }

  allDeleleteObject() {
    let objectText = this.surveyForm.controls.objectArray as FormArray;
    objectText.controls = [];
  }

  objectPaste(event, idx) {
    let clipboardData = event.clipboardData.getData('Text');
    let objectText = this.surveyForm.controls.objectArray as FormArray;
    let wordList = clipboardData.split('\r\n')
    if(wordList[wordList.length-1] === "") {
      wordList.splice(wordList.length-1, 1);
    }
    wordList = wordList.map((obj)=>{
      return obj.split('\t');
    })

    setTimeout(()=>{
      wordList.reverse().map((obj)=>{
        this.insertObjectText(idx, obj[0], obj[1], true);
      })
      this.removeObjectText(idx);
    }, 50)
  }

  openRow(idx, event) {
    return new Promise((resolve)=>{
      this.insertObjectText(idx);
      resolve(true)
    })
  }
}
