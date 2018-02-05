// ################################################################## //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : login                                     # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { LoginForm } from  './login.form';
import { Router, ActivatedRoute } from '@angular/router'
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppServices } from './../../service/app.services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
  ],
  providers: [LoginForm],
})
export class LoginComponent implements OnInit {

  public msgs: Message[] = [];
  constructor(
    private msgSrv: MessageService,
    public lf:LoginForm,
    private router: Router,
    public route: ActivatedRoute,
    public serv: AppServices,
  ) { }

  ngOnInit() {}
  get email() {
    return this.lf.loginForm.get('email');
  }
  get password() {
    return this.lf.loginForm.get('password');
  }

public onSubmit() {
    if (this.lf.loginForm.valid) {
      const url:string = '/auth/local';
      let formData = new FormData();
      this.msgs = [];

      formData.append('email', this.lf.loginForm.value.email)
      formData.append('password', this.lf.loginForm.value.password)

      this.serv.login(formData)
      .then(data=>{
        this.lf.loginForm.reset();
        this.router.navigate(['../../top'], {relativeTo: this.route})
      })
      .catch(msg =>{
        this.msgs = [];
        this.msgs.push(msg);
      });



      // let http = new Req2('post', url, formData)
      // http.send(formData)
      // http.Complete = () =>{
      //   this.lf.loginForm.reset();
      //   this.us.isLogedIn = true;
      //   this.router.navigate(['../../top'], {relativeTo: this.route})
      // }
      // http.ServErr = () =>{
      //   this.msgs.push(http.smsgs)
      // }
      // http.AuthErr = () =>{
      //     if(http.status == 401) {
      //         this.msgs.push({
      //           severity: 'error',
      //           summary: '로그인 실패',
      //           detail: '로그인에 실패했습니다. 이메일 및 패스워드를 확인해 주세요.'
      //         })
      //     } else if(http.status == 402){
      //         this.msgs.push({
      //           severity: 'info',
      //           summary: '담당자 승인 중',
      //           detail: '담당자 승인 중 입니다. 승인 후 로그인 하실 수 있습니다.'
      //         })
      //     }
      // }
      // http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
    } else {
      console.log(this.lf.loginForm)
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: '입력이 모두 완료되지 않았습니다!', detail: ''});
    }
  }
}
