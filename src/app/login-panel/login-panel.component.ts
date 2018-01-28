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
import { RegistData, LoginData } from '../service/auth-data';
import { TermAgree } from  '../service/get-data';
import { RegexValidators } from "./register/register.validator";
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss',],
  providers: [LoginData, TermAgree, RegistData, RegexValidators ]
})
export class LoginPanelComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }



}
