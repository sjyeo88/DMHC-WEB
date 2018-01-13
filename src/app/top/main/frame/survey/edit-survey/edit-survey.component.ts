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
    this.loadTitleList();
  }


  loadTitleList() {
    this.nsf.titleList = [];
    this.sserv.getSurveys()
    .then(data=>{
      data.map((obj)=>{
        let addObject:Title = {idSURVEY:obj.idSURVEY, label: obj.title, value: obj.title}
        this.nsf.titleList.push(addObject)
      })
      this.title.value !== "" ? this.nsf.surveyForm.patchValue({title: this.title.value}) : null;
    })
  }

  loadSurvey(event) {
    this.sserv.getSurveyData(this.getSurveyID(event.value))
    .then(data=>{
      let arrText:string[]=[];
      this.nsf.surveyForm.patchValue({title: data[0].title});
      this.nsf.surveyForm.patchValue({measure: data[0].measure});
      for (let i=0; i < 7; i++) {
        data[0]['text0' + (i+1)] ? arrText[i]=data[0]['text0' + (i+1)] : null;
      }
      this.nsf.setMeasureText(data[0].measure, arrText);
      return data;
    })
    .then(data=>{
      // console.log(data.length);
      this.nsf.allDeleleteObject();
      for(let i=0; i<data.length; i++) {
        // console.log(data[i]);
        this.nsf.insertObjectText(i-1, data[i].text, data[i].type)
      }
    })
    .catch(msg =>{
      this.msgs.push(msg);
    })
  }

  getSurveyID(title) {
    return this.nsf.titleList.filter((row)=>{ return row.value == title })[0].idSURVEY
  }

  saveAs() {
    console.log(this.title);
    this.saveAsDialogView = false;
    if(this.nsf.surveyForm.valid && this.objectArray.controls) {
      this.saveSurvey(this.title.value)
      .then((res)=>{
        let addOption ={ value: this.title.value, label: this.title.value, idSURVEY: (res as any).insertId}
        this.nsf.titleList.push(addOption);
        this.nsf.surveyForm.patchValue({title: this.title.value});
      })
    } else {
      this.msgs = []
      this.msgs.push({
        severity: 'error',
        summary: '미작성',
        detail: '미작성된 항목이 있습니다.'
      })
    }
  }

  removeSurvey() {
    this.sserv.deleteSurvey(this.getSurveyID(this.title.value))
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
