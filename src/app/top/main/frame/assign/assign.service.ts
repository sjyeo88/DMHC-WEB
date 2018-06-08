import { Injectable } from '@angular/core'
import { Req2 } from './../../../../ysjmodule/Req2';


@Injectable()
export class AssignService {
  constructor() {}

  getLecture():Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/lectures/finished');
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getSurvey():Promise<any> {
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

  getAssignFinished():Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/assigns/finished');
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getAssignList():Promise<any> {
    return new Promise((resolve, reject)=>{
      let http = new Req2('get', '/data/assigns/list')
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }
  getAssignListByPage(page):Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/assigns/list/' + page);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getAssignAll(idSBJT_CONF_ALL):Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/assigns/all/' + idSBJT_CONF_ALL );
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getAssignDetail(idSBJT_CONF_ALL):Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('get', '/data/assign/detail/' + idSBJT_CONF_ALL);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  saveAssignConf(data:FormData):Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('post', '/data/assign', data);
      http.send(data);
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  confirmAssignConf(title):Promise<any> {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('put', '/data/assigns/' + title);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  delAssign(idSBJT_CONF_ALL) {
    return new Promise((resolve, reject)=>{
      // console.log(data);
      let http =  new Req2('delete', '/data/assign/' + idSBJT_CONF_ALL);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getAssignByTitle(title):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('get', '/data/assigns/list/title/' + title);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getAssignBySubTitle(subTitle):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('get', '/data/assigns/list/subTitle/' + subTitle);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getAssignByLecture(lecture):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('get', '/data/assigns/list/lecture/' + lecture);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getAssignByCommand(command):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('get', '/data/assigns/list/command/' + command);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getHashList(hash):Promise<any> {
    return new Promise((resolve, reject)=>{
      let url = '/data/hash/name/' + hash;
      console.log(url)
      let http =  new Req2('get', url);
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }
}
