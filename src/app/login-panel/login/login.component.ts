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

    } else {
      console.log(this.lf.loginForm)
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: '입력이 모두 완료되지 않았습니다!', detail: ''});
    }
  }
}
