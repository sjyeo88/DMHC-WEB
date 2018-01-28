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
import { SurveyForm } from './survey.form';
import { SurveyService } from '../survey.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/primeng'
import { NewSurveyComponent } from '../new-survey/new-survey.component'
import { EditSurveyComponent } from '../edit-survey/edit-survey.component'

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  providers: [
    SurveyModel,
    SurveyService,
  ]
})

export class SurveyComponent implements OnInit {
  @ViewChildren('focusInput') objInput: QueryList<ElementRef>

  public titleAs:string = ''
  public isObjectText:boolean = true;
  public pageHeight:number;
  public msgs: Message[] = []
  public saveAsDialogView = false;
  public isDuplicated:boolean = false;
  public isNew:boolean = true;

  constructor(
    public lay: Layout,
    public survModel: SurveyModel,
    public nsf: SurveyForm,
    public sserv: SurveyService,
    public confirm: ConfirmationService,
  ) { }

  ngOnInit() {}


  public saveAs() {};
  public getTitle(idx) {
    let result = this.nsf.titleList.filter((row)=>{
      return row.value === idx;
    })
    return result[0].label;
  }

  public getSurveyList(msg?:boolean, value?) {
    this.nsf.titleList = [];
    this.sserv.getSurveys()
    .then(data=>{
      data.map(obj=>{
        this.nsf.titleList.push({label: obj.title, value: obj.idSURVEY});
        if (msg) {
        this.msgs = []
        this.msgs.push({severity:'success', summary:'새로고침 완료'})
        }
      })
      return this.nsf.titleList;
    })
    .then(titleList=>{
      if(value) {
        this.title.setValue(titleList.filter((obj)=>{ return obj.label === value})[0].value);
      }
    })
    .catch(msg=>{
      this.msgs=[];
      this.msgs.push(msg);
    })
  }

  onChangeMeasure(event) {
    this.nsf.setMeasureText(event.value);
  }

  onAddObject() {
    this.nsf.addObjectText()
    this.isObjectText = true;
  }

  onInsObject(idx) {
    idx = idx? idx : 0
    this.nsf.insertObjectText(idx)
  }

  onRemoveObject(index) {
    let length = this.nsf.removeObjectText(index);
    if(length === 0) this.isObjectText = false;
  }

  onAllDelObject() {
    this.nsf.allDeleleteObject();
    this.isObjectText = false;
  }


  check(item){
    console.log(item)
  }

  onEnter(idx, event) {
    if(event.keyCode === 13) {
      this.nsf.openRow(idx, event)
      .then(()=>{
        setTimeout(()=>{
          this.objInput.last.nativeElement.focus();
        }, 10)
      })
    }
    // this.objInput.last.
  }

  saveSurvey(title?) {
    return new Promise((resolve)=>{
      let data = new FormData();
      let objectData = [];
      if(this.isNew) data.append('title', title? title:this.title.value);
      else data.append('title', title? title:  this.getTitle(this.title.value));
      data.append('measure', this.measure.value);
      for(let i=0; i < this.measureTextArray.length; i++) {
        data.append('text0' + (i+1), (this.measureTextArray.controls[i] as FormGroup).controls.text.value);
      }
      for(let i=0; i < this.objectArray.length; i++) {
        objectData[i] = {
          idx: i,
          value: (this.objectArray.controls[i] as FormGroup).controls.text.value,
          type: (this.objectArray.controls[i] as FormGroup).controls.type.value,
        }
      }
      data.append('obj', JSON.stringify(objectData));
      this.sserv.postSurvey(data)
      .then(res =>{
        resolve(res);
        this.msgs = []
        this.msgs.push({
          severity: 'success',
          summary: '저장완료',
          detail: '저장 되었습니다.'
        })
      })
      .catch(msg=>{
        this.msgs=[]
        this.msgs.push(msg);
      })
    })
  }

  confirmDel(idx) {
     this.confirm.confirm({
       message: idx+1 + ' 번째 항목을 정말 삭제하시겠습니까?',
       header: '삭제 확인',
       accept: () => {
         this.onRemoveObject(idx)
       },
     })
  }

  confirmAllDel() {
     this.confirm.confirm({
       message: ' 모든 설문 항목을 정말 삭제하시겠습니까?',
       header: '삭제 확인',
       accept: () => {
         this.onAllDelObject();
       },
     })
  }

  confirmSaveAs() {
    this.titleAs = this.getTitle(this.title.value);
    this.saveAsDialogView = true;
  }

  confirmSave() {
    let prefix = this.isDuplicated ? '동일한 이름을 가진 설문이 있습니다.' : '';
    this.confirm.confirm({
     message: prefix + ' 현재 설문을 저장하시겠습니까?',
     header: '저장  확인',
     accept: () => {
       if(this.nsf.surveyForm.valid && this.objectArray.controls) {
         this.saveSurvey();

       } else {
          this.msgs = []
          this.msgs.push({
            severity: 'error',
            summary: '미작성',
            detail: '미작성된 항목이 있습니다.'
          })
       }
     },
   })
 }

  get title() {
    return this.nsf.surveyForm.get('title');
  }

  get measure() {
    return this.nsf.surveyForm.get('measure');
  }
  get measureTextArray() {
    return this.nsf.surveyForm.get('measureTextArray') as FormArray;
  }
  get objectArray() {
    return this.nsf.surveyForm.get('objectArray') as FormArray;
  }

}
