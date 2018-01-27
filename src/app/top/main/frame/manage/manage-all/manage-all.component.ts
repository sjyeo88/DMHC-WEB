// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : manage-all                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Layout } from './../../../../layout.service';
import { ManageService } from '../manage.service';
import { ManageAllForm } from './manage-all.form';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/primeng'

import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-manage-all',
  templateUrl: './manage-all.component.html',
  styleUrls: ['./manage-all.component.scss'],
  providers: [ ManageService, ManageAllForm ]
})
export class ManageAllComponent implements OnInit {
  public rowPerPage:number = 10;
  public cuPage:number = 0;
  public patientsByPage=[];
  public patients = [];
  public assignList= [];
  public msgs: Message[] = [];
  constructor(
    public lay: Layout,
    public serv:ManageService,
    public fm:ManageAllForm,
    public ref:ChangeDetectorRef,
    public confirm:ConfirmationService,
    public router:Router,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.manage.title
    this.lay.cuTitle.page =  this.lay.submenus.manage.menus[0];
    this.lay.currentMenu =  this.lay.submenus.manage;
    this.lay.currentPage = this.lay.cuTitle.page;
    this.getAssignList();

    this.search.valueChanges
    .debounceTime(500)
    .subscribe(data=>{
      if(data !== "") {
        this.searchPatients();
      } else {
        this.getPatients();
      }
    })
  }

  public getPatients() {
    this.serv.getPatients()
    .then(data=>{
      this.patients = data;
      return this.patients
    })
    .then(objs=>{
      objs.forEach((obj)=>{
        this.addFormGroup(obj)
      })
    })
    .then(()=>{
      this.onPageMove(0);
    })
  }


  public getAssignList() {
    this.serv.getAssignList()
    .then(data=>{
      data.forEach(obj=>{
        this.assignList.push({
          label: obj.title,
          value: obj.idSBJT_CONF_ALL,
        })
      })
    })
    .then(()=>{
      this.getPatients();
    })
    .catch(msg=>{
      this.msgs=[];
      this.msgs.push(msg);
    })
  }

  public onPageMove(page) {
    this.cuPage = page;
    this.patientsByPage = [];
    let beginNum = this.rowPerPage*page;
    let endNum = this.rowPerPage*(page+1);
    this.patientsByPage = this.patients.slice(beginNum, endNum);
  }

  public addFormGroup(obj) {
    obj.assigns = new FormGroup({
        assign: (obj.idSBJT_CONF_ALL === 1) && (obj.idEXPERT_USER !== 1)
        ? new FormControl('')
        : new FormControl(obj.idSBJT_CONF_ALL),
    })
    obj.lastAssign = obj.idSBJT_CONF_ALL;
    obj.assigns.get('assign').valueChanges
    .pairwise()
    .subscribe(pair => {
      obj.lastAssign = pair[0];
    });
  }

  public searchPatients() {
    switch(this.searchOpt.value) {
      case 0:
        this.serv.getPatientByName(this.search.value)
        .then(data =>{
          this.patients = data;
          return this.patients;
        })
        .then(objs=>{
          objs.forEach((obj)=>{
            this.addFormGroup(obj)
          })
        })
        .then(()=>{
          this.onPageMove(0);
        })
      break;
      case 1:
        this.serv.getPatientByAssign(this.search.value)
        .then(data =>{
          this.patients = data;
          return this.patients;
        })
        .then(objs=>{
          objs.forEach((obj)=>{
            this.addFormGroup(obj)
          })
        })
        .then(()=>{
          this.onPageMove(0);
        })
      break;
    }
  }


  confirmAssign(event, idx) {
     this.confirm.confirm({
       message: '해당 내담자의 과제그룹을 변경하시겠습니까?',
       header: '변경 확인',
       accept: () => {
         this.serv.putAssignGroup(this.patientsByPage[idx].idPATIENT_USER, event.value)
         .then(data=>{
           this.msgs=[];
           this.msgs.push({severity: 'success', summary:'내담자의 과제 그룹이 변경되었습니다.'});
         })
         .catch(msg=>{
           this.msgs=[];
           this.msgs.push(msg);
         })
       },
       reject: () =>{
        this.patientsByPage[idx].assigns.get('assign')
        .patchValue(this.patientsByPage[idx].lastAssign);
       }
     })
  }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
    //for avoid ExpressionChangedAfterItHasBeenCheckedError
  }

  onDetailPatient(item) {
    this.router.navigate(['/top/main/frame/manage/detail', item.idPATIENT_USER])
  }

  get searchOpt() {
    return this.fm.form.get('searchOpt');
  }
  get search() {
    return this.fm.form.get('search');
  }
}
