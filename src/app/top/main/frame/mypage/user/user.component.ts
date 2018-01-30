// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : user                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit, HostListener, ViewChild, QueryList,ElementRef, Renderer2 } from '@angular/core';
import { Layout } from './../../../../layout.service';
import { UserService } from './../../../../user.service'
import { UserForm } from './user.form'
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserForm]
})
export class UserComponent implements OnInit {
  @ViewChild('inputObj') pwObj: ElementRef;
  public viewPwdDialog = false;
  public postData:Function;
  public userData;
  public msgs:Message[];
  constructor(
    public lay:Layout,
    public user:UserService,
    public fm:UserForm,
    public rd:Renderer2,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.currentPage = this.lay.submenus.mypage.menus[0];
    this.lay.cuTitle.title = this.lay.submenus.mypage.title
    this.lay.cuTitle.page =  this.lay.submenus.mypage.menus[0];
    this.lay.currentMenu =  this.lay.submenus.mypage;

    this.user.getUser()
    .then(data=>{
      this.userData = data;
      return data;
    })
    .then(data=>{
      this.getJobs();
      this.getDepts();
      return data;
    })
    .then(data=>{
      this.fm.form.get('email').patchValue(data.email);
      this.fm.form.get('phone').patchValue(data.phone);
    })
  }


  getJobs() {
    this.user.getJobs()
    .then(data=>{
      data.forEach(obj=>{
        this.fm.jobOpt.push({label: obj.name , value: obj.idJOBS})
      })
    })
    .then(()=>{
      this.fm.form.get('job').patchValue(this.userData.idJOBS);
    })
  }

  getDepts() {
    this.user.getDepts()
    .then(data=>{
      data.forEach(obj=>{
        this.fm.deptOpt.push({label: obj.name , value: obj.idDEPT})
      })
    })
    .then(()=>{
      this.fm.form.get('dept').patchValue(this.userData.idDEPT);
    })
  }



  onChangeInfo(type) {
    // console.log(this.pwObj)//nativeElement.focus();
    setTimeout(()=>{
      this.pwObj.nativeElement.focus()
    }, 50);
    // console.log(this.pwObj);
    switch(type) {
      case 0:
        if(this.email.valid) {
          this.viewPwdDialog= true;
          this.postData = ()=>{ this.updateEmail(); }
        } else {
          this.msgs = [];
          this.msgs.push({
            severity: 'error',
            summary: '입력오류',
            detail: '이메일이 형식에 맞지 않습니다.',
          })
        }
        break;
      case 1:
        if(this.phone.valid) {
          this.viewPwdDialog= true;
          this.postData = ()=>{ this.updatePhone(); }
        } else {
          this.msgs = [];
          this.msgs.push({
            severity: 'error',
            summary: '입력오류',
            detail: '휴대전화 번호가 형식에 맞지 않습니다.',
          })
        }
      break;
      case 2:
        this.viewPwdDialog= true;
        this.postData = ()=>{ this.updateDept(); }
        break;
      case 3:
        if(this.license.valid) {
          this.viewPwdDialog= true;
          this.postData = ()=>{ this.updateJob(); }
        } else {
          this.msgs = [];
          this.msgs.push({
            severity: 'error',
            summary: '입력오류',
            detail: '직종 변경에는 자격증업로드가 필요합니다.',
          })
        }
      break;
    }
  }

  updateEmail() {
    let form = new FormData();
    form.append('email', this.email.value)
    form.append('password', this.password.value)
    this.user.putEmail(form)
    .then(()=>{
      this.msgs = [];
      this.msgs.push({
        severity:'success',
        summary:'이메일 변경 완료',
        detail:'치료자의 이메일 정보가 변경되었습니다.'})
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })
    this.viewPwdDialog = false;
    this.password.reset();
  }

  updatePhone() {
    let form = new FormData();
    form.append('phone', this.phone.value)
    form.append('password', this.password.value)
    this.user.putPhone(form)
    .then(()=>{
      this.msgs = [];
      this.msgs.push({
        severity:'success',
        summary:'전화번호 변경 완료',
        detail:'치료자의 전화번호 정보가 변경되었습니다.'})
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })
    this.viewPwdDialog = false;
    this.password.reset();
  }

  updateDept() {
    let form = new FormData();
    form.append('dept', this.dept.value)
    form.append('password', this.password.value)
    this.user.putDept(form)
    .then(()=>{
      this.msgs = [];
      this.msgs.push({
        severity:'success',
        summary:'소속기관 변경 완료',
        detail:'치료자의 소속기관 정보가 변경되었습니다.'})
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })
    this.viewPwdDialog = false;
    this.password.reset();
  }

  updateJob() {
    let form = new FormData();
    form.append('job', this.job.value)
    form.append('jobName', this.fm.jobOpt.filter(obj=>{return obj.value === this.job.value})[0].label)
    form.append('license', this.license.value)
    form.append('password', this.password.value)
    this.user.putJob(form)
    .then(()=>{
      this.msgs = [];
      this.msgs.push({
        severity:'success',
        summary:'직종 변경 신청 완료',
        detail:'치료자의 직종정보가 변경 신청되었습니다. 관리자 검토 후 변경적용이 됩니다.'
      });
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })
    this.viewPwdDialog = false;
    this.password.reset();
  }
  onUpload(event) {
    this.license.patchValue(event.files[0]);
  }

  get email() {
    return this.fm.form.get('email');
  }
  get password() {
    return this.fm.form.get('password');
  }
  get phone() {
    return this.fm.form.get('phone');
  }
  get job() {
    return this.fm.form.get('job');
  }
  get dept() {
    return this.fm.form.get('dept');
  }
  get license() {
    return this.fm.form.get('license');
  }


}
