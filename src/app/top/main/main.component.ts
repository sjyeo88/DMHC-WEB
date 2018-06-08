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
import { NewSurveyForm } from './frame/survey/new-survey/new-survey.form'
import { EditSurveyForm } from './frame/survey/edit-survey/edit-survey.form'
import { AssignEditForm } from './frame/assign/assign-edit/assign-edit.form';
import { AssignNewForm } from './frame/assign/assign-new/assign-new.form';
import { NewLectureData } from  './frame/lecture/new-lecture-data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    EditSurveyForm,
    NewSurveyForm,
    NewLectureData,
  ]
})
export class MainComponent implements OnInit {
  @ViewChild(ShortcutComponent) shortcut: ShortcutComponent;
  constructor() { }

  ngOnInit() {
  }


}
