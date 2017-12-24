// ################################################################## //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : access-term:         ;                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { TermAgree } from  '../../service/get-data';
import { RegistData } from  '../../service/auth-data';

@Component({
  selector: 'app-access-term',
  templateUrl: './access-term.component.html',
  styleUrls: ['./access-term.component.scss'],
})

export class AccessTermComponent implements OnInit {
  termForm:FormGroup;
  a_term_agree: boolean;
  p_term_agree: boolean;
  agreeWarningMSG: String;
  agree_warning_show: boolean
  public msgs: Message[] = [];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public TA: TermAgree,
    public rf: RegistData,
  ) { }

  ngOnInit() {
  }

  public onSubmit() {
    if (this.TA.a_term_agree && this.TA.p_term_agree) {
        this.router.navigate(['../register'], {relativeTo: this.route})
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: '동의 필요', detail: '필수 동의사항을 확인해주세요.'});
    }
  }
}
