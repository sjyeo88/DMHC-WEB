import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YHttp } from  '../ysjmodule/yhttp.module';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Job, Dept, Admin } from './get-data';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
// import {CookieService} from 'angular2-cookie/core';

const httpOptions = {
    headers: new HttpHeaders({'Content-typ': 'application/json'})
};

export class Req2 extends YHttp {
  private apiUrl:string = 'http://localhost:3001/api';

  public cmsgs:any = {
    severity: 'error',
    summary: '네트워크 연결이 불안합니다.',
    detail: '네트워크 연결이 불안합니다. 잠시 후 다시 시도해 주세요.'
  };
  public smsgs:any = {
    severity: 'error',
    summary: '요청에 실패했습니다',
    detail: '요청에 실패했습니다. 잠시 후 다시 시도해 주세요.'
  };

  constructor(method, url, formData?:FormData) {
    super(method, url, formData);
    this.url = this.apiUrl + url
  }

}
