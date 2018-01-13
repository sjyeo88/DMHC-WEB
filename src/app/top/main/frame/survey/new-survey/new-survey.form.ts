import { Injectable } from '@angular/core'
import { FormArray, AbstractControl, FormControl,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SurveyForm } from '../survey/survey.form'
// import { LectureValidMsgs, LectureRegexValidators } from "./new-lecture.validator";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/observable/from';

@Injectable()
export class NewSurveyForm extends SurveyForm {
    // surveyForm: FormGroup
    // defaultPageNum:number = 1;
    // valider = new ValidConfig();
    constructor(fb:FormBuilder) {
      super(fb)
    }
}
