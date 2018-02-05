import { Injectable } from '@angular/core'
import { Req2 } from './../../../../ysjmodule/Req2'

@Injectable()
export class FaqService {
  constructor() {}

  getBoards():Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/faqs');
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
      let http =  new Req2('get', '/data/faqs/title/' + title);
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
      let http =  new Req2('get', '/data/faqs/detail/' + detail);
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
      let http =  new Req2('post', '/data/faq', data);
      http.send(data);
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  delBoard(idFAQ):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('delete', '/data/faq/' + idFAQ);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }
}
