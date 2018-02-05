
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
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { HeaderComponent } from './header/header.component';
import { Layout } from './layout.service';
import { AppModels } from './../service/app.models';
import { AppServices } from './../service/app.services';
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
    public lay:Layout,
    private router: Router,
    public route: ActivatedRoute,
    public model: AppModels,
    public serv: AppServices,
  ) {}

  ngOnInit() {
    this.getUser();
  }


  public getUser() {
    this.serv.getUser()
    .then(data=>{
      let userInfo = data[0]
      this.model.user.idEXPERT_USER = userInfo.idEXPERT_USER;
      this.model.user.name = userInfo.name;
      this.model.user.email= userInfo.email;
      this.model.user.deptName = userInfo.deptName;
      this.model.user.idDEPT = userInfo.idDEPT;
      this.model.user.jobName = userInfo.jobName;
      this.model.user.idJOBS = userInfo.idJOBS;
      this.model.user.birth = userInfo.birth;
      this.model.user.phone= userInfo.phone;
      this.model.user.loginDate = new Date(userInfo.last_login_date);
      return this.model.user;
    })
  }
}
