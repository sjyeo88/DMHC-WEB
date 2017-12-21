import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidMsgs, RegexValidators } from "./register.validator";
import { KoDate } from "../../date-ko";
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router'

import { GetPublicDataService, Req2 } from '../../get-data/get-public-data.service';
import { Job, Dept } from  '../../get-data/get-data';
import { TermAgree } from  '../../get-data/get-data';
import { RegistData } from  '../../get-data/auth-data';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    KoDate,
    RegexValidators,
    ValidMsgs,
  ],
})

export class RegisterComponent implements OnInit {
  // Define Types

  // registForm: FormGroup;
  ko: any;
  jobs:Job[];
  depts:Dept[];
  license_imgs: any[] = [];
  license_img: any[] = [];
  chkFile: any[] = [];
  fileSelected: boolean = false;
  public msgs: Message[] = [];
  public isJobLoaded:boolean
  public isDeptLoaded:boolean

  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
    private msgSrv: MessageService,
    public vmsg:ValidMsgs,
    public koClass:KoDate,
    public TA: TermAgree,
    private valider: RegexValidators,
    private dataService: GetPublicDataService,
    private router: Router,
    public route: ActivatedRoute,
    public rf: RegistData,
    // public rq: Req,
  ) {
    this.ko = this.koClass.ko;
    if (!(this.TA.a_term_agree && this.TA.p_term_agree)) {
        this.router.navigate(['../access-term'], {relativeTo: this.route})
    }

  }

  ngOnInit() {
    this.getJobs();
    this.getDepts();


  }

  get username() {
    //username === 'username' function 명 Model명 똑같아야 함.
    return this.rf.registForm.get('username');
  }
  get email() {
    return this.rf.registForm.get('email');
  }
  get password() {
    return this.rf.registForm.get('passwordGroup.password');
  }
  get password_check() {
    return this.rf.registForm.get('passwordGroup.password_check');
  }
  get passwordGroup() {
    return this.rf.registForm.get('passwordGroup');
  }
  get birthday() {
    return this.rf.registForm.get('birthday');
  }
  get phone_num() {
    return this.rf.registForm.get('phone_num');
  }
  get job() {
    return this.rf.registForm.get('job');
  }
  get dept() {
    return this.rf.registForm.get('dept');
  }

  getJobs():void {
    let http = new Req2('get', '/jobs')
    http.send();
    http.Complete = ()=> {
      // console.log(typeof http.response)
      this.jobs = JSON.parse(http.response);
      this.isJobLoaded = true
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
  }

  getDepts():void {
    let http = new Req2('get', '/jobs')
    http.send();
    http.Complete = ()=> {
      // console.log(typeof http.response)
      this.depts= JSON.parse(http.response);
      this.isDeptLoaded = true
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
  }
  

  onUpload(event) {
      this.fileSelected = true;
      for(let file of event.files) {
          this.license_imgs.push(file);
      }
      this.license_imgs = event.files; //To uploading file data.
      // sessionStorage.setItem('license', event.files[0])

      this.msgs = [];
      this.msgs.push({severity: 'success', summary: '파일 선택 완료', detail: ''});
  }

  onRemoved(event) {
    this.license_imgs.splice(this.license_imgs.indexOf(event.file), 1);
  }

  public onSubmit() {

    if (this.rf.registForm.valid && (this.license_imgs.length !==0)) {
      const url:string = 'http://localhost:3001/api/auth/local/register';
      const formData = new FormData();
      this.msgs = [];

      // formData.append('username', this.rf.registForm.value.username)
      // formData.append('email', this.rf.registForm.value.email)
      // formData.append('password', this.rf.registForm.value.passwordGroup.password)
      // formData.append('birthday', this.rf.registForm.value.birthday)
      // formData.append('job', this.rf.registForm.value.job.idJOBS)
      // formData.append('dept', this.rf.registForm.value.dept.idDEPT)
      // formData.append('phone', this.rf.registForm.value.phone_num)
      // formData.append('license_file', this.license_imgs[0], this.license_imgs[0].name);
      //
      //
      // let http = new YHttp('post', url, formData)
      //
      //
      // http.send(formData)

    } else {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: '입력이 모두 완료되지 않았습니다!', detail: ''});
    }
  }

  ngOnDestroy() {
          this.rf.registForm.value.job = null;
          this.rf.registForm.value.dept = null;
  }

  // Page Refresh Check
  // @HostListener('window:beforeunload', ['$event'])
  //  doSomething($event) {
  //    $event.returnValue='Your data will be lost!';
  // }
}
