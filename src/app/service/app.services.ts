import { Injectable } from '@angular/core'
import { Req2 } from './../ysjmodule/Req2';

@Injectable()
export class AppServices {

  request(method, url, data?:FormData):Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2(method, url)

    if(data) { http.send(data); }
    else { http.send(); }

    http.Complete = ()=> {
      resolve(http.response);
    }
    http.AuthErr = () =>{ reject(http.amsgs)}
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  login(data:FormData):Promise<any>{
    return new Promise((resolve, reject)=>{
    let http = new Req2('post', '/auth/local')
    http.send(data);
    http.Complete = ()=> {
      resolve(true);
    }
    http.AuthErr = () =>{
      if(http.status === 402) {
        reject({
          severity: 'info',
          summary: '담당자 승인 중',
          detail: '담당자 승인 중 입니다. 승인 후 로그인 하실 수 있습니다.'
        });
      }
      else { reject(http.amsgs); }
    }
    http.ServErr = () =>{ reject(http.smsgs)}
    http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getUserList():Promise<{idEXPERT_USER:number, email:string}[]>{
    return new Promise((resolve, reject)=>{
      this.request('get', '/data/users')
      .then(data=>{ resolve(JSON.parse(data)); })
      .catch(msg=>{ reject(msg); });
    });
  }

  getJobList():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('get', '/data/jobs')
      .then(data=>{ resolve(JSON.parse(data)); })
      .catch(msg=>{ reject(msg); });
    });
  }

  getDeptList():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('get', '/data/depts')
      .then(data=>{ resolve(JSON.parse(data)); })
      .catch(msg=>{ reject(msg); });
    });
  }

  register(data):Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('post', '/auth/local/register', data)
      .then(data=>{ resolve(data); })
      .catch(msg=>{ reject(msg); });
    });
  }


  chkSession():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('get', '/auth/local')
      .then(data=>{ resolve(data); })
      .catch(msg=>{ reject(msg); });
    })
  }

  delSession():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('delete', '/auth/local')
      .then(data=>{ resolve(data); })
      .catch(msg=>{ reject(msg); });
    })
  }

  getUser():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('get', '/data/user')
      .then(data=>{ resolve(JSON.parse(data)); })
      .catch(msg=>{ reject(msg); });
    })
  }

  getNotices():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('get', '/data/notices')
      .then(data=>{ resolve(JSON.parse(data)); })
      .catch(msg=>{ reject(msg); });
    })
  }

  getUnregistedPatient():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('get', '/data/patients/unregist/count')
      .then(data=>{ resolve(JSON.parse(data)); })
      .catch(msg=>{ reject(msg); });
    })
  }

  getPatient():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('get', '/data/patients/count')
      .then(data=>{ resolve(JSON.parse(data)); })
      .catch(msg=>{ reject(msg); });
    })
  }

  getAdmin():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('get', '/data/admin')
      .then(data=>{ resolve(JSON.parse(data)); })
      .catch(msg=>{ reject(msg); });
    })
  }

  getEmail(data):Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('post', '/auth/email', data)
      .then(data=>{ resolve(JSON.parse(data)); })
      .catch(msg=>{ reject(msg); });
    })
  }

  initPassword(data):Promise<any>{
    return new Promise((resolve, reject)=>{
      this.request('post', '/auth/password', data)
      .then(data=>{ resolve(JSON.parse(data)); })
      .catch(msg=>{ reject(msg); });
    })
  }
}
