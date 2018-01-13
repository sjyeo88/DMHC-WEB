// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : new-survey                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Layout } from './../../../../layout.service';
import { SurveyModel } from './../survey.model';
import { NewSurveyForm } from './new-survey.form';
import { SurveyService } from '../survey.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/primeng'
import { SurveyComponent } from '../survey/survey.component'

@Component({
  selector: 'app-new-survey',
  templateUrl: '../survey/survey.component.html',
  // templateUrl: './new-survey.component.html',
  styleUrls: ['../survey/survey.component.scss'],
  providers: [
    SurveyModel,
    SurveyService,
  ]
})

export class NewSurveyComponent extends SurveyComponent {
  @ViewChildren('focusInput') objInput: QueryList<ElementRef>

  constructor(
    public lay: Layout,
    public survModel: SurveyModel,
    public nsf: NewSurveyForm,
    public sserv: SurveyService,
    public confirm: ConfirmationService,
  ) {
    super(lay, survModel, nsf, sserv, confirm);
  }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.survey.title
    this.lay.cuTitle.page =  this.lay.submenus.survey.menus[0];
    this.lay.currentMenu =  this.lay.submenus.survey;
    this.lay.currentPage = this.lay.cuTitle.page;

    this.title.valueChanges
    .debounceTime(500)
    .subscribe(title=>{
      this.sserv.getSurveys()
      .then(data=>{
        if(data.some((value)=>{ return value.title == title })) {
          this.isDuplicated=true;
        } else {
          this.isDuplicated=false;
        }
      })
    })
  }
}
