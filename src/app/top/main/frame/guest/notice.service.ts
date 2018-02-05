import { Injectable } from '@angular/core'
import { Req2 } from './../../../../ysjmodule/Req2'

@Injectable()
export class NoticeService {
  constructor() {}

  getBoards():Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/notices');
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getBoardsByTitle(title):Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/notices/title/' + title);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getBoardsByDetail(detail):Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/notices/detail/' + detail);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  chkAdmin():Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('get', '/data/admin/check');
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  postBoard(data):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('post', '/data/notice', data);
      http.send(data);
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  delBoard(idNOTICE):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('delete', '/data/notice/' + idNOTICE);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }
}
