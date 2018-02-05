// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : assign-all                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { AssignService } from '../assign.service';
import { Layout } from './../../../../layout.service';
import { AssignBoard  } from '../assign.model';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { Options } from '../assign.model';
import { Router, ActivatedRoute } from '@angular/router'
import { ConfirmationService } from 'primeng/primeng'
import { AssignAllForm } from './assign-all.form'

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-assign-all',
  templateUrl: './assign-all.component.html',
  styleUrls: ['./assign-all.component.scss'],
  providers: [AssignService, Options, AssignAllForm]

})
export class AssignAllComponent implements OnInit {

  allAssignItems = [];
  allAssignBoard = [];
  assignBoardByPage = [];
  msgs: Message[] = [];
  lectures = [];
  rowPerPage = 15;
  cuPage:number = 0;

  constructor(
    public as: AssignService,
    public lay:Layout,
    private router: Router,
    public route: ActivatedRoute,
    public opt: Options,
    public confirm: ConfirmationService,
    public fm: AssignAllForm,
  ) {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.assign.title
    this.lay.cuTitle.page =  this.lay.submenus.assign.menus[0];
    this.lay.currentMenu =  this.lay.submenus.assign;
    this.lay.currentPage = this.lay.cuTitle.page;

    this.name.valueChanges
    .debounceTime(500)
    .subscribe(data=>{
      if(data !== "") {
        this.searchAssign();
      } else {
        this.getAssignList();
      }
    })
  }

  ngOnInit() {
    this.getLecture();
  }


  getAssignList() {
    this.allAssignBoard = [];
    this.as.getAssignList()
    .then(data =>{
      data.forEach(obj=>{
        this.allAssignBoard.push({
          no: obj.idSBJT_CONF_ALL,
          title: obj.title,
          lecture: this.getLectureName(obj.idLECTURE),
          status: obj.status==1 ? true : false ,
          statusMsg: obj.status==1 ? '작성중' : '작성완료' ,
          date: obj.UPDATE_TIME,
          expand: false,
        })
        this.allAssignBoard.push({detailList: []});
      })
    })
    .then(()=>{
      this.onPageMove(0);
    })
  }

  getAssignDetail(items) {
    let result = items.map((obj)=>{
      return [
        '과제번호: ' + obj.idSBJT_CONF_ALL + "-" + obj.index,
        '과제명 : ' + obj.subTitle,
        '제시문 : ' + obj.command,
        '과제 생성조건 : ' + this.getOptionLabel(this.opt.createTimeCond, obj.type_create_condition),
        '과제 생성수량 : ' + this.getOptionLabel(this.opt.createNumCond, obj.type_create_num),
        '내담자 입력방식 : ' + this.getOptionLabel(this.opt.inputType, obj.type_input),
        '과제 푸시 알림 :  '
        + this.timePipe(new Date(obj.conf_push_time_01)) + ' ~ '
        + this.timePipe(new Date(obj.conf_push_time_02)),
        '과제 소멸 조건 : ' + this.getOptionLabel(this.opt.delOpt, obj.type_del),
        '과제 제시 중지 조건 : ' + this.getOptionLabel(this.opt.stopOpt, obj.type_stop),
      ]
    })
    return result
  }

  getOptionLabel(options, value) {
    return options.filter((obj)=>{ return obj.value === value })[0].label;
  }

  timePipe(time:Date) {
    let AMPM = time.getHours() < 12 ? 'AM' : 'PM';
    let hour = AMPM==='PM' ? time.getHours()-12 : time.getHours();
    let min = (time.getMinutes() < 10) ? '0' + time.getMinutes() : time.getMinutes()
    return AMPM + ' '+ hour + ':' + min;
  }

  onEditMove(item) {
    this.router.navigate(['../edit', {isParam: true, idSBJT_CONF_ALL: item.no}], {relativeTo: this.route});
  }

  onDelAssign(idSBJT_CONF_ALL, idx) {
    this.as.delAssign(idSBJT_CONF_ALL)
    .then(()=>{
      this.allAssignBoard.splice(idx, 2);
      // console.log(this.allAssignBoard);
    })
    .then(()=>{
      this.onPageMove(this.cuPage);
    })
  }

  onExpand(item, idx) {
    this.as.getAssignDetail(item.no)
    .then(data=>{
      this.allAssignBoard[idx+1].detailList =
      this.getAssignDetail(
        data.map(obj=>{
          return {
            idSBJT_CONF_ALL: obj.idSBJT_CONF_ALL,
            subTitle: obj.subTitle,
            command: obj.command,
            index: obj.idx + 1,
            type_create_condition: obj.type_create_condition,
            type_create_num: obj.type_create_num,
            type_input: obj.type_input,
            conf_push_time_01: obj.conf_push_time_01,
            conf_push_time_02: obj.conf_push_time_02,
            type_del: obj.type_del,
            type_stop: obj.type_stop,
          }
        })
      )
    })
    .then(()=>{
      if(item.expand) {
        item.expand = false;
      } else {
        item.expand = true;
      }
    })
  }

  getExpandClass(item) {
    if(item.exapand) { return 'table-detail'}
    else {return 'table-detail-hide'};
  }

  getLectureName(lectureId) {
    return this.lectures.filter((obj)=>{
      return obj.value === lectureId
    })[0].label
  }

  getLecture(msg?:boolean) {
    this.lectures = [];
    return this.as.getLecture()
    .then(data=>{
      data.map(obj=>{
        this.lectures.push({label: obj.title, value: obj.idLECTURE});
        if (msg) {
        this.msgs = []
        this.msgs.push({severity:'success', summary:'새로고침 완료'})
        }
      })
      return this.lectures;
    })
    .then(obj=>{
      this.getAssignList();
    })
    .catch(msg=>{
      this.msgs=[];
      this.msgs.push(msg);
    })
  }

  confirmDel(item, idx) {
    console.log(item);
     this.confirm.confirm({
       message: item.title + ' 과제를 정말 삭제하시겠습니까?',
       header: '삭제 확인',
       accept: () => {
         this.onDelAssign(item.no, idx)
       },
     })
  }
  onPageMove(page) {
    this.cuPage = page;
    let beginNum = 2*this.rowPerPage*page;
    let endNum = 2*this.rowPerPage*(page+1);
    this.assignBoardByPage = this.allAssignBoard.slice(beginNum, endNum);
  }

  searchAssign() {
    switch(this.option.value) {
      case 0:
        this.as.getAssignByTitle(this.name.value)
        .then(data => {
          this.allAssignBoard=[];
          data.forEach(obj=>{
          this.allAssignBoard.push({
            no: obj.idSBJT_CONF_ALL,
            title: obj.title,
            lecture: this.getLectureName(obj.idLECTURE),
            status: obj.status==1 ? true : false ,
            statusMsg: obj.status==1 ? '작성중' : '작성완료' ,
            date: obj.UPDATE_TIME,
            expand: false,
          })
          this.allAssignBoard.push({detailList: []});
          })
        })
        .then(()=>{
          this.onPageMove(0)
        })
      break;
      case 1:
        this.as.getAssignByLecture(this.name.value)
        .then(data => {
          this.allAssignBoard=[];
          data.forEach(obj=>{
          this.allAssignBoard.push({
            no: obj.idSBJT_CONF_ALL,
            title: obj.title,
            lecture: this.getLectureName(obj.idLECTURE),
            status: obj.status==1 ? true : false ,
            statusMsg: obj.status==1 ? '작성중' : '작성완료' ,
            date: obj.UPDATE_TIME,
            expand: false,
          })
          this.allAssignBoard.push({detailList: []});
          })
        })
        .then(()=>{
          this.onPageMove(0)
        })
      break;
      case 2:
        this.as.getAssignBySubTitle(this.name.value)
        .then(data => {
          this.allAssignBoard=[];
          data.forEach(obj=>{
          this.allAssignBoard.push({
            no: obj.idSBJT_CONF_ALL,
            title: obj.title,
            lecture: this.getLectureName(obj.idLECTURE),
            status: obj.status==1 ? true : false ,
            statusMsg: obj.status==1 ? '작성중' : '작성완료' ,
            date: obj.UPDATE_TIME,
            expand: false,
          })
          this.allAssignBoard.push({detailList: []});
          })
        })
        .then(()=>{
          this.onPageMove(0)
        })
      break;
      case 3:
        this.as.getAssignByCommand(this.name.value)
        .then(data => {
          this.allAssignBoard=[];
          data.forEach(obj=>{
          this.allAssignBoard.push({
            no: obj.idSBJT_CONF_ALL,
            title: obj.title,
            lecture: this.getLectureName(obj.idLECTURE),
            status: obj.status==1 ? true : false ,
            statusMsg: obj.status==1 ? '작성중' : '작성완료' ,
            date: obj.UPDATE_TIME,
            expand: false,
          })
          this.allAssignBoard.push({detailList: []});
          })
        })
        .then(()=>{
          this.onPageMove(0)
        })
      break;
    }
  }

  get name() {
    return this.fm.searchForm.get('name');
  }
  get option() {
    return this.fm.searchForm.get('option');
  }
}
