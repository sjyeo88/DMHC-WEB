import { Injectable } from '@angular/core'
import { Req2 } from './../../../service/get-public-data.service'

export class ShortcutService {
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
