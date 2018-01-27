// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : manage-detail                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { ChangeDetectorRef, Component, OnInit, ViewChildren, AfterViewChecked, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Layout } from './../../../../layout.service';
import { ManageService } from '../manage.service';
import { ManageDetailForm, IDropdown } from './manage-detail.form';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { Chart } from 'chart.js';
import { ConfirmationService } from 'primeng/primeng'

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-manage-detail',
  templateUrl: './manage-detail.component.html',
  styleUrls: ['./manage-detail.component.scss'],
  providers: [ManageService, ManageDetailForm],
})
export class ManageDetailComponent implements AfterViewChecked{

  public tgtPatientId= this.route.snapshot.paramMap.get('idPATIENT_USER')

  public allAssignList:IDropdown[] = [];
  public allPatientList:IDropdown[] = [];
  public allSurveyList:IDropdown[] = [];
  public allPatientData = [];
  public lastSelectedAssign:number;
  public msgs: Message[] = [];
  public year = new Date().getFullYear();
  public chart:Chart

  public tgtPatient={
      idPATIENT_USER:'',
      idSBJT_CONF_ALL:'',
      email:'',
      name:'',
      birth:'',
      age:0,
      gender: null,
      phone:'',
      JOIN_DATE:'',
      LAST_LOGIN_DATE:'',
      finished_sbjt:'',
      unfinished_sbjt:'',
  };
  public surveyResult:any = {
    labels: [],
    datasets: [
    {
      label: '',
      data: [],
      fill: false,
      borderColor: '#009E73',
    },
    ]
  }
  public chartOpt = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin:0,
          suggestedMax:50,
          beginAtZero: true,
        }
      }],
      xAxes: [{
        type: 'time',
        time: {
          min: new Date(this.year, 0),
          max: new Date(this.year, 12),
          displayFormats: {
            month: 'MMM'
          },
          unit: 'month',
          stepSize:1,
        }
      }]
    },
    elements: {
      line: {
        tension: 0,
      }
    },
  }

  constructor(
      public lay:Layout,
      public serv:ManageService,
      public fm:ManageDetailForm,
      public confirm: ConfirmationService,
      public ref:ChangeDetectorRef,
      public route:ActivatedRoute,
    ) {
    }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.manage.title
    this.lay.cuTitle.page =  this.lay.submenus.manage.menus[1];
    this.lay.currentMenu =  this.lay.submenus.manage;
    this.lay.currentPage = this.lay.cuTitle.page;
    this.getAssignList();
    this.getPatients();
    let ctx = document.getElementById('myChart')
    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.surveyResult,
      options: this.chartOpt
    })
    console.log(this.tgtPatientId);

    this.fm.form.get('assign').valueChanges
      .pairwise()
      .subscribe(pair => {
        this.lastSelectedAssign = pair[0];
    })
  }

  getSurveyResult(event) {
    this.serv.getSurveyResult(this.tgtPatient.idPATIENT_USER, event.value, this.year)
    .then(data=>{
      let result = []
      if(data.length !== 0) {
        this.surveyResult.datasets[0].label = data[0].title
        return data.map((obj, idx)=> {
          // this.surveyResult.datasets[idx].label = data[idx].title;
          return {
            t:new Date(obj.PUSH_TIME),
            y:obj.POINT,
          }
        })
      } else {
        throw null;
      }
    })
    .then(result=>{
      console.log(result);
      this.surveyResult.datasets[0].data = result;
    })
    .then(()=>{
      this.msgs=[];
      let ctx = document.getElementById('myChart')
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.surveyResult,
        options: this.chartOpt
      })
      this.chart.update();
    })
    .catch(()=>{
      this.surveyResult.datasets[0].data = [];
      this.chart.update();

      this.msgs=[];
      this.msgs.push({
        severity:'error',
        summary:'결과없음',
        detail:'설문 결과를 찾을 수 없습니다.',
      })
    })
  }

  yearUp(){
    this.year++;
    if(this.survey.value) {
      this.getSurveyResult(this.survey);
    }
  }

  yearDown(){
    this.year--;
    if(this.survey.value) {
      this.getSurveyResult(this.survey);
    }
  }

  updateChart(event){
    this.surveyResult = this.surveyResult;
  }

  loadPatient(idPATIENT_USER) {
    new Promise((resolve, reject) => {
    // console.log(this.allPatientData);
    let patient = this.allPatientData.filter(obj=>{
      return obj.idPATIENT_USER === parseInt(idPATIENT_USER);
    })
    if(patient.length !== 0) {
      resolve(patient)
    } else {
      reject(patient)
    }
    })
    .then(patient =>{
      (this.tgtPatient as any) = patient[0];
      return this.tgtPatient;
    })
    .then(patient=>{
      let user = (patient as any)
      user.age = this.serv.getAge(user.birth)
      this.assign.patchValue(user.idSBJT_CONF_ALL);
      this.getSurveyList(user.idPATIENT_USER);
    })
    .catch(()=>{
      this.msgs = [];
      this.msgs.push({
        severity:'error',
        summary:'유효한 사용자가 아닙니다.',
      })
    })
  }

  getAssignList() {
    this.serv.getAssignList()
    .then(data=>{
      data.forEach(obj=>{
        this.allAssignList.push({
          label: obj.title,
          value: obj.idSBJT_CONF_ALL,
        })
      })
    })
    .catch(msg=>{
      this.msgs=[];
      this.msgs.push(msg);
    })
  }

  getPatients() {
    this.serv.getPatients()
    .then(data=>{
      this.allPatientData = data
      data.forEach(obj=>{
        this.allPatientList.push({
          label: '[' + ('000' + obj.idPATIENT_USER).slice(-4) + '] ' + obj.name + ' (만 ' + this.serv.getAge(obj.birth) + '세)',
          value: obj.idPATIENT_USER
        })
      })
      return this.allPatientData
    })
    .then(data=>{
      if(this.tgtPatientId) {
        // console.log(this.tgtPatientId);
        this.loadPatient(this.tgtPatientId);
        this.patient.patchValue(this.tgtPatientId);
      }
    })
    .catch(msg=>{
      this.msgs=[];
      this.msgs.push(msg);
    })
  }

  getSurveyList(idPATIENT_USER) {
    this.allSurveyList=[];
    this.serv.getSurveyList(idPATIENT_USER)
    .then(data=>{
      data.forEach(obj => {
        this.allSurveyList.push({
          label: obj.title,
          value: obj.idSURVEY,
        })
      });
    })
  }


  confirmAssign(event) {
     this.confirm.confirm({
       message: '해당 내담자의 과제그룹을 변경하시겠습니까?',
       header: '변경 확인',
       accept: () => {
         this.serv.putAssignGroup(this.tgtPatient.idPATIENT_USER, event.value)
         .then(data=>{
           this.msgs=[];
           this.msgs.push({severity: 'success', summary:'내담자의 과제 그룹이 변경되었습니다.'});
           this.tgtPatient.idSBJT_CONF_ALL = event.value;
         })
         .then(()=>{
            this.loadPatient(this.patient.value);
         })
         .catch(msg=>{
           this.msgs=[];
           this.msgs.push(msg);
         })
       },
       reject: () =>{
         this.assign.patchValue(this.lastSelectedAssign);
       }
     })
  }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
    //for avoid ExpressionChangedAfterItHasBeenCheckedError
  }

  get assign() {
    return this.fm.form.get('assign')
  }
  get survey() {
    return this.fm.form.get('survey')
  }
  get patient() {
    return this.fm.form.get('patient')
  }
}
