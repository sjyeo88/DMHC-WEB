import { Injectable } from '@angular/core'
import { Req2 } from './../service/get-public-data.service'

export class UserService {
  public isLogedIn:boolean = false;
  public userServ = {
      idEXPERT_USER: 0,
      name: '',
      dept: '',
      job: '',
      idDEPT: 0,
      idJOBS: 0,
      email: '',
      birth: '',
      phone: '',
      loginDate:new Date(),
  }
  public notices = []

  getUser():Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('get', '/auth/user')
    http.send();
    http.Complete = ()=> {
      resolve(JSON.parse(http.response));
    }
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getJobName(idJOBS):Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('get', '/data/jobs/' + idJOBS)
    http.send();
    http.Complete = ()=> {
      resolve(JSON.parse(http.response));
    }
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getDeptName(idDEPT):Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('get', '/data/depts/' + idDEPT)
    http.send();
    http.Complete = ()=> {
      resolve(JSON.parse(http.response));
    }
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }
    getJobs():Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('get', '/data/jobs')
    http.send();
    http.Complete = ()=> {
      resolve(JSON.parse(http.response));
    }
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getDepts():Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('get', '/data/depts')
    http.send();
    http.Complete = ()=> {
      resolve(JSON.parse(http.response));
    }
    http.ConErr = () =>{ reject(http.cmsgs)}
    http.ServErr = () =>{ reject(http.smsgs)}
    })
  }

  getNotices():Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('get', '/data/notices')
    http.send();
    http.Complete = ()=> {
      resolve(JSON.parse(http.response));
    }
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

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

  delSession():Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('delete', '/auth/local')
    http.send();
    http.Complete = ()=> {
      resolve(http.response);
    }
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

}
