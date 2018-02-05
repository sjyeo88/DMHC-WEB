// ################################################################## //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : login-panel                               # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TermAgree } from  '../service/app.models';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss',],
  providers: [ TermAgree ]
})
export class LoginPanelComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {
  }
}
