import { Injectable } from '@angular/core'
import { Req2 } from './../service/get-public-data.service'

export class UserService {
  public isLogedIn:boolean = false;
  public userServ = {
      name: '',
      dept: '',
      job: '',
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
}
