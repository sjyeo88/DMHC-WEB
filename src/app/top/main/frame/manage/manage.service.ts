import {Injectable } from '@angular/core'
import { Req2 } from '../../../../service/get-public-data.service';


@Injectable()
export class ManageService {
    getAssignList():Promise<any> {
      return new Promise((resolve, reject)=>{
        let http =  new Req2('get', '/data/assigns/list');
        http.send();
        http.Complete = ()=> {
          resolve(JSON.parse(http.response));
        }
        http.ServErr = () =>{ reject(http.smsgs)}
        http.ConErr = () =>{ reject(http.cmsgs)}
      })
    }

    getPatients():Promise<any> {
      return new Promise((resolve, reject)=>{
        let http =  new Req2('get', '/data/patients/list');
        http.send();
        http.Complete = ()=> {
          resolve(JSON.parse(http.response));
        }
        http.ServErr = () =>{ reject(http.smsgs)}
        http.ConErr = () =>{ reject(http.cmsgs)}
      })
    }

    getSurveyResult(idPATIENT_USER, idSURVEY, year):Promise<any> {
      return new Promise((resolve, reject)=>{
        let url = '/data/survey/result/' + idPATIENT_USER + '/' + idSURVEY + '/' + year;
        let http =  new Req2('get', url);
        http.send();
        http.Complete = ()=> {
          resolve(JSON.parse(http.response));
        }
        http.ServErr = () =>{ reject(http.smsgs)}
        http.ConErr = () =>{ reject(http.cmsgs)}
      })
    }

    getSurveyList(idPATIENT_USER):Promise<any> {
      return new Promise((resolve, reject)=>{
        let url = '/data/survey/list/' + idPATIENT_USER;
        let http =  new Req2('get', url);
        http.send();
        http.Complete = ()=> {
          resolve(JSON.parse(http.response));
        }
        http.ServErr = () =>{ reject(http.smsgs)}
        http.ConErr = () =>{ reject(http.cmsgs)}
      })
    }

    putAssignGroup(idPATIENT_USER, idSB_SBJT_CONF):Promise<any> {
      return new Promise((resolve, reject)=>{
        let url = '/data/assign/manage/' + idPATIENT_USER + '/' + idSB_SBJT_CONF;
        let http =  new Req2('put', url);
        http.send();
        http.Complete = ()=> {
          resolve(JSON.parse(http.response));
        }
        http.ServErr = () =>{ reject(http.smsgs)}
        http.ConErr = () =>{ reject(http.cmsgs)}
      })
    }

    getPatientByName(name):Promise<any> {
      return new Promise((resolve, reject)=>{
        let url = '/data/patients/list/name/' + name;
        let http =  new Req2('get', url);
        http.send();
        http.Complete = ()=> {
          resolve(JSON.parse(http.response));
        }
        http.ServErr = () =>{ reject(http.smsgs)}
        http.ConErr = () =>{ reject(http.cmsgs)}
      })
    }

    getPatientByAssign(assign):Promise<any> {
      return new Promise((resolve, reject)=>{
        let url = '/data/patients/list/assign/' + assign;
        let http =  new Req2('get', url);
        http.send();
        http.Complete = ()=> {
          resolve(JSON.parse(http.response));
        }
        http.ServErr = () =>{ reject(http.smsgs)}
        http.ConErr = () =>{ reject(http.cmsgs)}
      })
    }


  getAge(birth){
    let birthDate = new Date(birth).getTime();
    let now = new Date().getTime();
    return Math.floor(((now - birthDate)/31557600000))
  }
}
