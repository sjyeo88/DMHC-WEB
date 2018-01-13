// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : main                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit, ViewChild  } from '@angular/core';
import { ShortcutComponent } from './shortcut/shortcut.component';
import { NewLectureData } from './frame/lecture/new-lecture-data';
import { LectureRegexValidators } from './frame/lecture/new-lecture.validator'
import { LectureService } from './frame/lecture/lecture.service'
import { NewSurveyForm } from './frame/survey/new-survey/new-survey.form'
import { EditSurveyForm } from './frame/survey/edit-survey/edit-survey.form'
import { AssignForm } from './frame/assign/assign/assign.form'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    NewLectureData,
    LectureRegexValidators,
    LectureService,
    EditSurveyForm,
    NewSurveyForm,
    AssignForm,
  ]
})
export class MainComponent implements OnInit {
  @ViewChild(ShortcutComponent) shortcut: ShortcutComponent;
  constructor() { }

  ngOnInit() {
  }


}
