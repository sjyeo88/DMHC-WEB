// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : edit-survey                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //
import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Layout } from './../../../../layout.service';
import { FormArray, FormGroup } from '@angular/forms';
import { SurveyModel, Title } from './../survey.model';
import { SurveyService } from '../survey.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/primeng'
import { EditSurveyForm } from './edit-survey.form';
import { SurveyComponent } from '../survey/survey.component'

@Component({
  selector: 'app-edit-survey',
  templateUrl: '../survey/survey.component.html',
  styleUrls: ['../survey/survey.component.scss',],
  providers: [
    SurveyModel,
    SurveyService,
  ]
})
export class EditSurveyComponent extends SurveyComponent {
  constructor(
    lay: Layout,
    survModel: SurveyModel,
    nsf: EditSurveyForm,
    sserv: SurveyService,
    confirm: ConfirmationService,
  ) {
    super(lay, survModel, nsf, sserv, confirm);
  }

  ngOnInit() {
    this.isNew = false;
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.survey.title
    this.lay.cuTitle.page =  this.lay.submenus.survey.menus[1];
    this.lay.currentMenu =  this.lay.submenus.survey;
    this.lay.currentPage = this.lay.cuTitle.page;
    this.getSurveyList();
  }

  loadSurvey(event) {
    this.sserv.getSurveyData(event.value)
    .then(data=>{
      let arrText:string[]=[];
      this.nsf.surveyForm.patchValue({measure: data[0].measure});
      for (let i=0; i < 7; i++) {
        data[0]['text0' + (i+1)] ? arrText[i]=data[0]['text0' + (i+1)] : null;
      }
      this.nsf.setMeasureText(data[0].measure, arrText);
      return data;
    })
    .then(data=>{
      this.nsf.allDeleleteObject();
      for(let i=0; i<data.length; i++) {
        this.nsf.insertObjectText(i-1, data[i].text, data[i].type)
      }
    })
    .catch(msg =>{
      this.msgs.push(msg);
    })
  }

  public saveAs() {
    if(this.titleAs !== "" && this.titleAs.length < 30) {
      this.saveSurvey(this.titleAs);
      this.getSurveyList(null, this.titleAs);
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: '전송 실패', detail: '미작성된 부분이 있습니다.'})
    }
    this.saveAsDialogView = false;
  }

  removeSurvey() {
    this.sserv.deleteSurvey(this.title.value)
    .then(()=>{
      this.msgs = []
      this.msgs.push({
        severity: 'success',
        summary: '삭제완료',
        detail: this.title.value + ' 설문이 삭제되었습니다.',
      })
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })
  }
}
