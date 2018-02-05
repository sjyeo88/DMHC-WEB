import { Injectable } from '@angular/core'
import { Req2 } from './../../../../ysjmodule/Req2';


@Injectable()
export class SurveyService {
  constructor() {}

  getSurveys():Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/survey/all');
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getSurveyData(id):Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/survey/' + id);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  postSurvey(data:FormData):Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('post', '/data/survey', data);
      http.send(data);
      http.Complete = ()=> {
        // console.log(data);
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }
  deleteSurvey(idSURVEY:number):Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('delete', '/data/survey/' + idSURVEY);
      http.send();
      http.Complete = ()=> {
        // console.log(data);
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }
}
