import { Injectable } from '@angular/core'
import { Req2 } from './../service/get-public-data.service'

export class Services {

  getUser():Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('get', '/auth/user')
    http.send();
    http.Complete = ()=> {
      resolve(JSON.parse(http.response));
    }
    http.AuthErr = () =>{ reject(http.amsgs)}
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

}
