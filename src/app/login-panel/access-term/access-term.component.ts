import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { TermAgree } from  '../../get-data/get-data';
import { RegistData } from  '../../get-data/auth-data';

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
