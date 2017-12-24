
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

import { Component, OnInit } from '@angular/core';
import { Req2 } from '../service/get-public-data.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers:[],
})
export class TopComponent implements OnInit {
  user:any;
  isUserLoaded:boolean;
  msgs:any[];
  constructor(public msgSrv: MessageService ) { }

  ngOnInit() {
    this.getUser();
  }


  getUser():void {
    let http = new Req2('get', '/auth/user')
    http.send();
    http.Complete = ()=> {
      // console.log(typeof http.response)
      this.user= JSON.parse(http.response);
      console.log(this.user.name);
      this.isUserLoaded = true
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs);  console.log('NG')}
    http.ConErr = () =>{ this.msgs.push(http.cmsgs);  console.log('NG')}
  }

}
