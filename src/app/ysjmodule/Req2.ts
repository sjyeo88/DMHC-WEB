import { Injectable } from '@angular/core';
import { YHttp } from  './yhttp.module';
import { environment } from './../../environments/environment';
// import {CookieService} from 'angular2-cookie/core';

export class Req2 extends YHttp {
  private apiUrl:string = environment.apiUrl;
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
  public amsgs:any = {
    severity: 'error',
    summary: '로그인에 실패했습니다.',
    detail: '확인 후 다시 시도해 주세요.'
  };

  // constructor(method, url) {
  constructor(method, url, formData?:FormData) {
    super(method, url);
    this.url = this.apiUrl + url
  }
}
