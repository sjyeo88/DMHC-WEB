// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : welcome                                   # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { Admin } from '../../service/get-data';
import { Req2 } from '../../service/get-public-data.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public admin:Admin;
  public isDataLoaded:boolean = false;
  public msgs:any[]
  constructor(private msgServ: MessageService) {
  }

  ngOnInit() {
    this.getAdmin();
  }

  getAdmin():void {
    let http = new Req2('get', '/data/admin')

    http.send();
    http.Complete = ()=> {
      // console.log(typeof http.response)
      this.admin = JSON.parse(http.response)[0];
      this.isDataLoaded= true
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }

  }
}
