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

enum ViewMode {
  Calender,
  List,
  Survey,
}

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
  public isSurveyLoaded = false;
  public lastSelectedAssign:number;
  public msgs: Message[] = [];
  public year = new Date().getFullYear();
  public chart:Chart
  public ViewModeOpt: typeof ViewMode = ViewMode;
  public viewMode:number = 0;
  public assignCtrlOpt: IDropdown[] = [
    {label:'캘린더', value:this.ViewModeOpt.Calender},
    {label:'리스트', value:this.ViewModeOpt.List},
    {label:'설문 결과', value:this.ViewModeOpt.Survey},
  ];

  public tgtPatient={
      idPATIENT_USER:0,
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
    datasets: []
  }
  public cuDate = new Date();
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
          min: new Date(this.cuDate.getFullYear(), 0),
          max: new Date(this.cuDate.getFullYear(), 12),
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

  public calender=[
    new Array(6),
    new Array(6),
    new Array(6),
    new Array(6),
    new Array(6),
  ];

  public list=[];
  public isExpand=false;

  public result = {
    assignNum: 0,
    finished: 0,
    percentage: '',
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
    this.getAssignResult(this.cuDate);
    this.fm.form.get('assign').valueChanges
      .pairwise()
      .subscribe(pair => {
        this.lastSelectedAssign = pair[0];
    })
  }

  getAssignResult2(tgtDate:Date) {
    let year = tgtDate.getFullYear();
    let month = tgtDate.getMonth();
    this.serv.getAssigns(this.tgtPatient.idPATIENT_USER, year, month+1 )
    .then(data=>{
      this.list = data.sort((a, b)=>{
        return a.PUSH_TIME > b.PUSH_TIME ? -1 : a.PUSH_TIME === b.PUSH_TIME ? 0 : 1
      })
    })
  }

  tableSorter(list:Array<any>, field:string) {
    console.log(list);
    if(list[0][field] > list[list.length-1][field]) {
      list = list.sort((a, b)=>{
        let tgtA; let tgtB;
        if(typeof(a[field]) === 'string') {
          tgtA = a[field].toString()
          tgtB = b[field].toString()
        } else {
          tgtA = a[field]
          tgtB = b[field]
        }
        return tgtA < tgtB ? -1 : tgtA > tgtB ? 1 : 0
      })
    } else  {
      list = list.sort((a, b)=>{
        let tgtA; let tgtB;
        if(typeof(a[field]) === 'string') {
          tgtA = a[field].toString()
          tgtB = b[field].toString()
        } else {
          tgtA = a[field]
          tgtB = b[field]
        }
        return tgtA > tgtB ? -1 : tgtA < tgtB ? 1 : 0
      })
    }

  }

  getAssignResult(tgtDate:Date) {
    let year = tgtDate.getFullYear();
    let month = tgtDate.getMonth();
    this.serv.getAssigns(this.tgtPatient.idPATIENT_USER, year, month+1 )
    .then(data=>{
      let firstDate = new Date(year, month, 1)
      let lastDate = new Date(year, month+1, 0)
      let headDate = -1*(firstDate.getDay()-1)
      data = data.filter(obj=> { return obj.status === 1 || obj.status ===0 })
      this.result.assignNum = data.length
      this.result.finished = data.filter(obj=> { return obj.status == 1} ).length;
      this.result.percentage = (this.result.assignNum !== 0) ?
      (100*this.result.finished/this.result.assignNum).toFixed(2)  : '0';
      for(let i=0; i < 5; i++){
        for(let j=0; j < 7; j++) {
          let date = new Date(year, month, headDate);
          let assigns = data.filter((obj, idx)=>{
            return new Date(obj.PUSH_TIME).getDate() === date.getDate() &&
            new Date(obj.PUSH_TIME).getMonth() === date.getMonth()
          })
          this.calender[i][j] = {
            date: date,
            valid: headDate < 1 || headDate > lastDate.getDate() ? false : true,
            assigns: assigns
          }
          headDate++;
        }
      }
      return this.calender;
    })
  }

  getSurveyResult() {
    this.isSurveyLoaded = false;
    this.serv.getSurveyResult(this.tgtPatient.idPATIENT_USER, this.cuDate.getFullYear())
    .then(data=>{
      console.log(data);
      let result = []
      if(data.length !== 0) {
        let ids = data.reduce((last, cu) =>{
          if(!last.some(obj=>{ return obj === cu.idSURVEY })) {
             last.push(cu.idSURVEY);
           }
          return last
        }, [])
        return {ids, data};
      } else {
        throw null;
      }
    })
    .then(result => {
      //Data Splits
      let ids = result.ids;
      let data = result.data;
       return ids.map(key => {
        return data.filter(obj=> { return obj.idSURVEY === key })
      });
    })
    .then(result => {
      //Data Mapping for chart
      this.surveyResult.datasets = result.map((objs, idx) => {
        let colorPool = ['#197e42', '#9600ff', '#3615c1', '#c9410f', '#1d5086']
        return {
          label: objs[0].title,
          data: objs.map(obj => { return { t: new Date(obj.PUSH_TIME), y: obj.POINT }}),
          fill: false,
          borderColor: colorPool[idx%colorPool.length],
          backgroundColor: colorPool[idx%colorPool.length],
        }

      });
    })
    .then(()=>{
      this.msgs=[];
      if(!this.chart) {
        let ctx = document.getElementById('myChart')
        this.chart = new Chart(ctx, {
          type: 'line',
          data: this.surveyResult,
          options: this.chartOpt
        })
      }
      // this.chart.update();
      this.isSurveyLoaded = true;
    })
    .catch(()=>{
      this.isSurveyLoaded = true;
      this.surveyResult.datasets = [];
      // this.chart.update();

      this.msgs=[];
      this.msgs.push({
        severity:'error',
        summary:'결과없음',
        detail:'설문 결과를 찾을 수 없습니다.',
      })
    })
  }

  monthUp(){
    let year = this.cuDate.getFullYear()
    let month = this.cuDate.getMonth()
    this.cuDate = new Date(year, month, 0);
    this.changeView(this.viewMode);
  }

  monthDown(){
    let year = this.cuDate.getFullYear()
    let month = this.cuDate.getMonth()
    this.cuDate = new Date(year, month+2, new Date(year, month, 1).getDate()-1)
    this.changeView(this.viewMode);
  }

  yearUp(){
    let year = this.cuDate.getFullYear()
    let month = this.cuDate.getMonth()
    this.cuDate = new Date(year-1, month, this.cuDate.getDate())
    this.changeView(2);
  }

  yearDown(){
    let year = this.cuDate.getFullYear()
    let month = this.cuDate.getMonth()
    this.cuDate = new Date(year+1, month, this.cuDate.getDate())
    this.changeView(2);
  }

  dateInit() {
    this.cuDate = new Date();
  }

  onChangMode(event){
    this.dateInit();
    this.changeView(event.value);
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
    })
    .then(()=>{
      this.dateInit();
      this.changeView(0);
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
  changeView(value) {
    switch(value) {
      case this.ViewModeOpt.Calender:
        this.viewMode = this.ViewModeOpt.Calender;
        this.getAssignResult(this.cuDate);
      break;
      case this.ViewModeOpt.List:
        this.viewMode = this.ViewModeOpt.List;
        this.getAssignResult2(this.cuDate);
      break;
      case this.ViewModeOpt.Survey:
        this.viewMode = this.ViewModeOpt.Survey;
        this.getSurveyResult()
      break;
    }
  }

  listExpand() {
    this.isExpand = this.isExpand ? false : true;
    console.log(this.isExpand);
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
