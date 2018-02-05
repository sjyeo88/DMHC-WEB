// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : assign                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Layout } from './../../../../layout.service';
import { AssignForm } from './assign.form';
import { AssignService } from '../assign.service';
import { DropDownOpt, AssignConf, AssignConfAll, Options  } from '../assign.model';
import { ConfirmationService } from 'primeng/primeng'
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss'],
  providers: [AssignService, Options],
})

export class AssignComponent implements OnInit {
  @ViewChildren('rowLabel') objInput: QueryList<ElementRef>

  public isDuplicated:boolean = false;
  public saveAsDialogView:boolean = false;
  public isNew:boolean;
  public assignList: DropDownOpt[] = [];
  public lectures: DropDownOpt[] = [];
  public assignFinished: DropDownOpt[] = [];
  public surveyFinished: DropDownOpt[] = [];
  public msgs: Message[] = [];
  public assignConf:AssignConf[] = [];
  public titleAs:string = '';
  public idSBJT_CONF_ALL:number;
  public assignConfAll:AssignConfAll = {
    idSBJTS: 0,
    idSB_SBJT_CONF: 0,
    idLECTURE:0,
    idEXPERT_USER:0,
    title: '',
    status:0,
    assigns: this.assignConf,
  };

  constructor(
    public lay:Layout,
    public as:AssignService,
    public fm:AssignForm,
    public confirm: ConfirmationService,
    public opt: Options,
  ) {
  }
  public expand = "none";
  public expandClass = "assign-obj-hidden"
  public grid_gap= 0
  public height='115px';

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.assign.title
    this.lay.cuTitle.page =  this.lay.submenus.assign.menus[1];
    this.lay.currentMenu =  this.lay.submenus.assign;
    this.lay.currentPage = this.lay.cuTitle.page;
    // this.assigns.insert(1, JSON.stringify(this.fm.assignGroup)) );

    this.getLecture();
    this.getAssignFinished();
    this.getSurvey();
  }
  // ngAfterViewChecked() {
  //   this.cdr.detectChanges();
  // }

  public getLecture(msg?:boolean) {
    this.lectures = [];
    this.as.getLecture()
    .then(data=>{
      data.map(obj=>{
        this.lectures.push({label: obj.title, value: obj.idLECTURE});
        if (msg) {
        this.msgs = []
        this.msgs.push({severity:'success', summary:'새로고침 완료'})
        }
      })
    })
    .catch(msg=>{
      this.msgs=[];
      this.msgs.push(msg);
    })
  }

  public getAssignFinished(msg?:boolean) {
    this.assignFinished = [];
    this.as.getAssignFinished()
    .then(data=>{
      data.map(obj=>{
        this.assignFinished.push({label: obj.title, value: obj.idSBJT_CONF_ALL});
        if (msg) {
        this.msgs = []
        this.msgs.push({severity:'success', summary:'새로고침 완료'})
        }
      })
    })
    .catch(msg=>{
      this.msgs=[];
      this.msgs.push(msg);
    })
  }

  public getSurvey(msg?:boolean) {
    this.surveyFinished = [];
    this.as.getSurvey()
    .then(data=>{
      data.map(obj=>{
        this.surveyFinished.push({label: obj.title, value: obj.idSURVEY});
        if (msg) {
        this.msgs = []
        this.msgs.push({severity:'success', summary:'새로고침 완료'})
        }
      })
    })
    .catch(msg=>{
      this.msgs=[];
      this.msgs.push(msg);
    })
  }

  public confirmAssign() {
    this.as.getAssignList()
    .then(data=>{
      if(!data.some((row)=>{ return this.isNew ? row.title : row.idSBJT_CONF_ALL ===  this.title.value; })){
        this.msgs=[];
        this.msgs.push({severity:'error', summary:'등록 불가', detail:'저장 후 등록이 가능합니다.' })
      } else {
        this.as.confirmAssignConf(this.title.value)
        .then(()=>{
          this.msgs=[];
          this.msgs.push({severity:'success', summary:'등록 완료', detail:"등록이 완료되었습니다." })
        })
        .catch(msg=>{
          this.msgs=[];
          this.msgs.push(msg);
        })
      }
    })
  }

  public resetPackage() {
    this.assignConf = [];
    this.assignConfAll = {
      idSBJTS: 0,
      idSB_SBJT_CONF: 0,
      idLECTURE:0,
      idEXPERT_USER:0,
      title: '',
      status:0,
      assigns: this.assignConf,
    };

  }

  onEnter(idx, event, item) {
    if(event.keyCode === 13) {
      let tableData = item.get('input').get('table').get('tableData')
      this.fm.openRow(idx, tableData)
      .then(()=>{
        setTimeout(()=>{
          this.objInput.last.nativeElement.focus();
        }, 10)
      })
    }
    // this.objInput.last.
  }


  public expandAssign(item, i) {
    if (!item.controls.expand.value) {
      item.patchValue({'expand': true});
    }
    else {
      item.patchValue({'expand': false});
    }
  }

  public createFormCtrl(idx, item) {
    this.fm.createFormControl(idx, item);
  }


  public saveAs() {
    if(this.titleAs !== "" && this.titleAs.length < 30) {
      this.saveAssignData(this.titleAs);
      this.getAssignList(null, this.titleAs);
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: '전송 실패', detail: '미작성된 부분이 있습니다.'})
    }
    this.saveAsDialogView = false;
  }

  public saveAssignData(titleAs?) {
    if(this.fm.assignForm.valid && (this.assigns.length !==0)) {
      let assigns =  this.fm.assignForm.get('assigns') as FormArray;
      let title = this.fm.assignForm.get('title').value;
      this.assignConfAll.title=  this.isNew ? title : titleAs? titleAs : this.getTitle(title);
      this.assignConfAll.idLECTURE =  this.fm.assignForm.get('lecture').value;
      this.assignConfAll.status = 0;
      let data= new FormData();
      assigns.controls.forEach((obj, idx) => {
        this.assignConfAll.assigns.push({
          title: obj.get('subTitle').value,
          command: obj.get('command').value,
          index: idx,
          type_create_condition: obj.get('create').get('type').value,
          conf_create_condition_01 : obj.get('create').get('byDate').value,
          conf_create_condition_02 : obj.get('create').get('byNum').value,
          conf_create_condition_03 : obj.get('create').get('byNoAndAssign').get('byNum').value,
          conf_create_condition_04 : obj.get('create').get('byNoAndAssign').get('byAssign').value,
          type_create_num : obj.get('prod').get('type').value,
          conf_create_num_01: obj.get('prod').get('byNum').value,
          conf_create_num_02: JSON.stringify(obj.get('prod').get('byWeekDate').value),
          conf_create_num_03: obj.get('prod').get('byDate').value,
          conf_push_time_01: obj.get('push').get('times').get('fromTime').value,
          conf_push_time_02: obj.get('push').get('times').get('toTime').value,
          type_repush_time: obj.get('push').get('push_type').value,
          conf_repush_time_01: obj.get('push').get('time').value,
          type_input : obj.get('input').get('type').value,
          conf_input_01: obj.get('input').get('photo').value ? obj.get('input').get('photo').value : 0,
          conf_input_02: obj.get('input').get('num').value,
          conf_input_03: obj.get('input').get('time').value,
          conf_input_04: this.fm.getTableData(obj),
          conf_input_05: obj.get('input').get('survey').value,
          type_stop : obj.get('stop').get('stop_type').value,
          conf_stop_01 : obj.get('stop').get('byDate').value,
          conf_stop_02 : obj.get('stop').get('byNum').value,
          type_del: obj.get('del').get('del_type').value,
          conf_del_01: obj.get('del').get('byDate').value,
          conf_del_02: obj.get('del').get('byNum').value,
        })
      })

      this.assignConfAll.assigns.sort(this.compareDateDcend);
      //console.log(this.assignConfAll.assigns);

      data.append('assign',  JSON.stringify(this.assignConfAll))
      this.as.saveAssignConf(data)
      .then(result=>{
        this.idSBJT_CONF_ALL = result.insertId
        this.resetPackage();
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: '저장 완료', detail: '과제 그룹이 저정되었습니다.'})
      })
      .catch(msg=>{
        this.msgs=[];
        this.msgs.push(msg);
      })
    } else {
      console.log(this.fm.assignForm);
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: '전송 실패', detail: '미작성된 부분이 있습니다.'})
    }
  }

  private confirmDel(item, idx) {
     this.confirm.confirm({
       message: idx+1 + ' 번째 항목을 정말 삭제하시겠습니까?',
       header: '삭제 확인',
       accept: () => {
         this.fm.delAssign(item, idx)
       },
     })
  }

  private checkCal(data) {
    console.log(this.lectures);
  }

  compareDateDcend(a, b) {
      return (a.index > b.index) ? 1 :
             ((a.index < b.index) ? -1 : 0)
  }

  public getAssignList(msg?:boolean, value?) {
    this.assignList = [];
    this.as.getAssignList()
    .then(data=>{
      data.map(obj=>{
        this.assignList.push({label: obj.title, value: obj.idSBJT_CONF_ALL});
        if (msg) {
        this.msgs = []
        this.msgs.push({severity:'success', summary:'새로고침 완료'})
        }
      })
      return this.assignList;
    })
    .then(assignList=>{
      if(value) {
        this.title.setValue(assignList.filter((obj)=>{ return obj.label === value})[0].value);
      }
    })
    .catch(msg=>{
      this.msgs=[];
      this.msgs.push(msg);
    })
  }

  public getTitle(idx) {
    let result = this.assignList.filter((row)=>{
      return row.value === idx;
    })
    return result[0].label;
  }

  public confirmSaveAs() {
    this.titleAs = this.getTitle(this.title.value);
    this.saveAsDialogView = true;
  }

  public confirmSave() {
    let prefix = this.isDuplicated ? '동일한 이름을 가진 설문이 있습니다.' : '';
    this.confirm.confirm({
     message: prefix + ' 현재 설문을 저장하시겠습니까?',
     header: '저장  확인',
     accept: () => {
        this.saveAssignData()
     },
   })
 }

  get assigns() {
    return this.fm.assignForm.get('assigns') as FormArray;
  }
  get title() {
    return this.fm.assignForm.get('title');
  }
  get surveys() {
    return this.fm.assignForm.get('surveys') as FormArray;
  }
}
