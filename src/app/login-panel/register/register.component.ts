// ################################################################## //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : register                                  # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit, HostListener } from '@angular/core';
import { KoDate } from "../../date-ko";
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router'
import { ValidMsgs } from  './register.form';
import { RegisterForm } from  './register.form';
import { TermAgree } from  '../../service/app.models';
import { DropDownOpt } from  './../../interfaces/shared.interface';
import { AppServices } from './../../service/app.services';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ KoDate, ValidMsgs, RegisterForm],
})

export class RegisterComponent implements OnInit {
  // Define Types

  // registForm: FormGroup;
  ko: any;
  license_imgs: any[] = [];
  license_img: any[] = [];
  public jobs: DropDownOpt[] = [];
  public depts: DropDownOpt[] = [];
  fileSelected: boolean = false;
  public msgs: Message[] = [];
  public isMail:boolean
  public vmsg: ValidMsgs;

  constructor(
    private msgSrv: MessageService,
    public koClass:KoDate,
    public TA: TermAgree,
    private router: Router,
    public route: ActivatedRoute,
    public rf:RegisterForm,
    public serv:AppServices,
    // public rq: Req,
  ) {
    this.ko = this.koClass.ko;
    if (!(this.TA.a_term_agree && this.TA.p_term_agree)) {
        this.router.navigate(['../access-term'], {relativeTo: this.route})
    }

  }

  ngOnInit() {
    this.vmsg = new ValidMsgs(),
    this.serv.getJobList()
    .then(data=>{
      this.jobs = data.map(obj=>{ return {label: obj.name, value: obj.idJOBS} })
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })

    this.serv.getDeptList()
    .then(data=>{
      this.depts = data.map(obj=>{ return {label: obj.name, value: obj.idDEPT} })
      // this.depts.push({label = data.name;
      // this.depts.value = data.idDEPT;
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })

    this.email.valueChanges
    .debounceTime(500)
    .subscribe(email=>{
      this.isMail = false;
      this.serv.getUserList()
      .then(data=>{
        if(data.some(obj=>{ return obj.email === email})) {
          this.isMail = true;
        }
      })
      .catch(msg=>{
        this.msgs = [];
        this.msgs.push(msg);
      })
    })
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
  get passwordCheck() {
    return this.rf.registForm.get('passwordGroup.passwordCheck');
  }
  get passwordGroup() {
    return this.rf.registForm.get('passwordGroup');
  }
  get birthday() {
    return this.rf.registForm.get('birthday');
  }
  get phoneNum() {
    return this.rf.registForm.get('phoneNum');
  }
  get job() {
    return this.rf.registForm.get('job');
  }
  get dept() {
    return this.rf.registForm.get('dept');
  }
  get license() {
    return this.rf.registForm.get('license');
  }

  onUpload(event) {
    this.license.patchValue(event.files[0]);
  }

  public onSubmit() {

    if (!this.isMail && this.rf.registForm.valid) {
      let formData = new FormData();
      formData.append('username', this.username.value)
      formData.append('email', this.email.value)
      formData.append('password', this.password.value)
      formData.append('birthday', this.birthday.value)
      formData.append('job', this.job.value)
      formData.append('dept', this.dept.value)
      formData.append('jobName', this.jobs.filter(obj=>{ return obj.value === this.job.value})[0].label)
      formData.append('deptName', this.depts.filter(obj=>{ return obj.value === this.dept.value})[0].label)
      formData.append('phone', this.phoneNum.value)
      formData.append('license', this.rf.registForm.value.license);

      this.serv.register(formData)
      .then(data=>{
        this.rf.registForm.reset();
        this.router.navigate(['../welcome'], {relativeTo: this.route})
      })
      .catch(msg=>{
        this.msgs=[];
        this.msgs.push(msg);
      })
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: '입력이 모두 완료되지 않았습니다!', detail: ''});
    }
  }

  // ngOnDestroy() {
  //         this.rf.registForm.value.job = null;
  //         this.rf.registForm.value.dept = null;
  // }


  // Page Refresh Check
  @HostListener('window:beforeunload', ['$event'])
   chkReload($event) {
     $event.returnValue='Your data will be lost!';
  }

  @HostListener('window:popstate', ['$event'])
  chkBack($event) {
     this.rf.registForm.controls.passwordGroup.reset();
  }

}
