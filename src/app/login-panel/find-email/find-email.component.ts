import { Component, OnInit } from '@angular/core';
import { FindEmailForm } from './find-email.form'
import { DropDownOpt } from  './../../interfaces/shared.interface';
import { AppServices } from './../../service/app.services';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router'
import { KoDate } from "../../date-ko";

@Component({
  selector: 'app-find-email',
  templateUrl: './find-email.component.html',
  styleUrls: ['./find-email.component.scss', '../register/register.component.scss'],
  providers: [ FindEmailForm, KoDate ]
})
export class FindEmailComponent implements OnInit {
  public jobs: DropDownOpt[] = [];
  public depts: DropDownOpt[] = [];
  public msgs: Message[] = [];
  public ko: KoDate  = new KoDate();
  public findEmail:string = '';
  public isEmail:boolean = false;
  public questions = [
    {value:0, label:'나의 출신 초등학교는?'},
    {value:1, label:'아버지 성함은?'},
    {value:2, label:'어머니 성함은?'},
    {value:3, label:'나의 가장 친한 친구는?'}
  ]
  constructor(
    public fm:FindEmailForm,
    public serv:AppServices,
    private router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.serv.getJobList()
    .then(data=>{
      this.jobs = data.map(obj=>{ return {label: obj.name, value: obj.idJOBS} })
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })

    this.serv.getDeptList()
    .then(data=>{
      this.depts = data.map(obj=>{ return {label: obj.name, value: obj.idDEPT} })
      // this.depts.push({label = data.name;
      // this.depts.value = data.idDEPT;
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })
  }

  onSubmitEmail() {
    let data = new FormData();
    data.append('name', this.username.value);
    data.append('phone', this.phoneNum.value);
    data.append('birthday', this.birthday.value);
    data.append('dept', this.dept.value);
    data.append('job', this.job.value);
    this.serv.getEmail(data)
    .then(result=>{
      if(result[0]) {
        this.findEmail = result[0].email
        this.password_q.setValue(result[0].password_q);
        this.isEmail = true;
        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: '이메일 확인',
          detail: '조건에 맞는 이메일을 찾았습니다',
        });
      } else {
        this.msgs.push({
          severity: 'error',
          summary: '이메일 확인',
          detail: '조건에 맞는 이메일을 찾지못했습니다',
        });
      }
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })
  }

  onSubmitPassword() {
    let data = new FormData();
    data.append('email', this.findEmail);
    data.append('password_q', this.password_q.value);
    data.append('password_a', this.password_a.value);
    this.serv.initPassword(data)
    .then(result=>{
      if(result) {

        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: '비밀번호 초기화 완료',
          detail: '비밀번호가 초기화 되었습니다. 초기화된 비밀번호는 회원님의 이메일로 전송되었습니다.',
        });

        setTimeout(()=>{
          this.router.navigate(['../'], {relativeTo: this.route})
        }, 2000)
      } else {
        this.msgs = [];
        this.msgs.push({
          severity: 'error',
          summary: '비밀번호 초기화 실패',
          detail: '비밀번호 질문/답변이 올바르지 않습니다',
        });
      }
    })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
    })
  }

  get username() {
    return this.fm.form.get('username');
  }
  get phoneNum() {
    return this.fm.form.get('phoneNum');
  }
  get birthday() {
    return this.fm.form.get('birthday');
  }
  get dept() {
    return this.fm.form.get('dept');
  }
  get job() {
    return this.fm.form.get('job');
  }

  get password_q() {
    return this.fm.form.get('password_q');
  }
  get password_a() {
    return this.fm.form.get('password_a');
  }
}
