
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

import { Component, OnInit, ViewChild} from '@angular/core';
import { Req2 } from '../service/get-public-data.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { HeaderComponent } from './header/header.component';
import { Layout } from './layout.service';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers:[],
})

export class TopComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  isUserLoaded:boolean;
  public msgs: Message[] = [];
  constructor(
    public msgSrv: MessageService,
    public us:UserService,
    public lay:Layout,
    private router: Router,
    public route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getUser();
  }


  public getUser() {
    this.us.getUser()
    .then(data=>{
      this.us.userServ.idEXPERT_USER = data.idEXPERT_USER;
      this.us.userServ.name = data.name;
      this.us.userServ.email= data.email;
      this.us.userServ.dept = data.idDEPT;
      this.us.userServ.idDEPT = data.idDEPT;
      this.us.userServ.job = data.idJOBS;
      this.us.userServ.idJOBS = data.idJOBS;
      this.us.userServ.birth = data.birth;
      this.us.userServ.phone= data.phone;
      this.us.userServ.loginDate = new Date(data.last_login_date);
      return this.us.userServ;
      // console.log(data);
    })
    .then(user=>{
      this.us.getDeptName(user.dept)
      .then(dept =>{
       user.dept = dept[0].name
      })

      this.us.getJobName(user.job)
      .then(job=>{
       user.job= job[0].name
      })
      return user
    })
  }



}
