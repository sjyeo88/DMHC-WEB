import { Injectable } from '@angular/core'
import { Req2 } from './../../../../../ysjmodule/Req2';

export class UserService {
  constructor() {}
  putEmail(data:FormData):Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('put', '/auth/user/email', data)
    http.send(data);
    http.Complete = ()=> {
      resolve(JSON.parse(http.response));
    }
    http.AuthErr = () =>{ reject({
      severity: 'error',
      summary: '비밀번호가 잘못되었습니다.',
      detail:'치료자의 정보변경에 실패했습니다.'
    })}
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  putPhone(data:FormData):Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('put', '/auth/user/phone', data)
    http.send(data);
    http.Complete = ()=> {
      resolve(JSON.parse(http.response));
    }
    http.AuthErr = () =>{ reject({
      severity: 'error',
      summary: '비밀번호가 잘못되었습니다.',
      detail:'치료자의 정보변경에 실패했습니다.'
    })}
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  putDept(data:FormData):Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('put', '/auth/user/dept', data)
    http.send(data);
    http.Complete = ()=> {
      resolve(JSON.parse(http.response));
    }
    http.AuthErr = () =>{ reject({
      severity: 'error',
      summary: '비밀번호가 잘못되었습니다.',
      detail:'치료자의 정보변경에 실패했습니다.'
    })}
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  putJob(data:FormData):Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('put', '/auth/user/job', data)
    http.send(data);
    http.Complete = ()=> {
      resolve();
    }
    http.AuthErr = () =>{ reject({
      severity: 'error',
      summary: '비밀번호가 잘못되었습니다.',
      detail:'치료자의 정보변경에 실패했습니다.'
    })}
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }
}
