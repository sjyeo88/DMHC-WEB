
// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : top                                       # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit, ViewChild } from '@angular/core';
import { Req2 } from '../service/get-public-data.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { HeaderComponent } from './header/header.component';
import { Layout } from './layout.service';
import { UserService } from './user.service';
import { Patient } from './patient.service';
import { Notice } from './notice.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers:[Patient, Notice],
})

export class TopComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  isUserLoaded:boolean;
  public msgs: Message[] = [];
  constructor(
    public msgSrv: MessageService,
    public lay:Layout,
    public userService:UserService,
    public patient:Patient,
    public notice:Notice,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.getUser(()=>{
      this.getAddedInfo();
    });
  }

  ngOnInit() {
  }


  getUser(callback:Function):void {
    let http = new Req2('get', '/auth/user')
    http.send();
    http.Complete = ()=> {
      let user;
      // console.log(typeof http.response)
      user= JSON.parse(http.response);
      this.userService.user.name = user.name;
      this.userService.user.email= user.email;
      this.userService.user.idJOBS = user.idJOBS;
      this.userService.user.idDEPT = user.idDEPT;
      this.userService.user.loginTime = user.LAST_LOGIN_DATE;
      callback();
      // console.log(http.response);
    }
    http.AuthErr = () =>{
      this.userService.isLogedIn = false;
      this.router.navigate(['../expire'])
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs);}
    http.ConErr = () =>{ this.msgs.push(http.cmsgs);}

  }

  getAddedInfo() {
    this.getJobName();
    this.getDeptName();
    this.getPatient();
    this.getNotices();
  }

  getJobName():void {
    let http = new Req2('get', '/data/jobs/' + this.userService.user.idJOBS)
    let job
    http.send();
    http.Complete = ()=> {
      job= JSON.parse(http.response);
      this.userService.user.job = job[0].name
      // console.log(typeof http.response)
      // this.user= JSON.parse(http.response);
      // this.main.shortcut.user.name = this.user.name;
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs); }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs);  }
  }

  getDeptName():void {
    let http = new Req2('get', '/data/depts/' + this.userService.user.idDEPT)
    let dept;
    http.send();
    http.Complete = ()=> {
      dept= JSON.parse(http.response);
      this.userService.user.dept= dept[0].name
      // console.log(typeof http.response)
      // this.user= JSON.parse(http.response);
      // this.main.shortcut.user.name = this.user.name;
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs); }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs);  }
  }

  getPatient():void {
    let http = new Req2('get', '/data/patient/' + this.userService.user.idDEPT)
    let patient;
    http.send();
    http.Complete = ()=> {
      patient= JSON.parse(http.response);
      this.patient.patient = patient;
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs); }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs);  }

  }

  getNotices():void {
    let http = new Req2('get', '/data/notices')
    let notices;
    http.send();
    http.Complete = ()=> {
      notices= JSON.parse(http.response);
      this.notice.notice= notices;
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs);  }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs);  }
  }

}
