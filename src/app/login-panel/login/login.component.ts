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
import { LoginData } from  '../../service/auth-data';
import { Req2 } from '../../service/get-public-data.service';
import { Router, ActivatedRoute } from '@angular/router'
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
  ]
})
export class LoginComponent implements OnInit {

  public msgs: Message[] = [];
  constructor(
    private msgSrv: MessageService,
    public lf:LoginData,
    private router: Router,
    public route: ActivatedRoute,
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
      const formData = new FormData();
      this.msgs = [];

      formData.append('email', this.lf.loginForm.value.email)
      formData.append('password', this.lf.loginForm.value.password)


      let http = new Req2('post', url, formData)
      http.send(formData)
      http.Complete = () =>{
        this.lf.loginForm.reset();
        this.router.navigate(['../../top'], {relativeTo: this.route})
      }
      http.ServErr = () =>{
        this.msgs.push(http.smsgs)
      }
      http.AuthErr = () =>{
          if(http.status == 401) {
              this.msgs.push({
                severity: 'error',
                summary: '로그인 실패',
                detail: '로그인에 실패했습니다. 이메일 및 패스워드를 확인해 주세요.'
              })
          } else if(http.status == 402){
              this.msgs.push({
                severity: 'info',
                summary: '담당자 승인 중',
                detail: '담당자 승인 중 입니다. 승인 후 로그인 하실 수 있습니다.'
              })
          }
      }
      http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
    } else {
      console.log(this.lf.loginForm)
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: '입력이 모두 완료되지 않았습니다!', detail: ''});
    }
  }
}
