import { Injectable } from '@angular/core'
import { Req2 } from './../../../../ysjmodule/Req2'

@Injectable()
export class QnaService {
  constructor() {}

  postDetail(data):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('post', '/data/qna', data);
      http.send(data);
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  postImg(data):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('post', '/data/qna/img', data);
      http.send(data);
      http.Complete = ()=> {
        resolve(http.response);
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

}
