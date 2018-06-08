import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { Hash, HashSub } from './hash.model';
import { Req2 } from './../../../../ysjmodule/Req2';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/observable/from';


@Injectable()
export class HashService {
  public hash:Hash;
  public hashes:Hash[];
  public hashSubs:HashSub[];
  public msgs:Message[];

  constructor() {

  }

  getHashStruct():Promise<any[]> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('get', '/data/hash/struct');
      http.send();
      http.Complete = ()=> {
        resolve(JSON.parse(http.response));
      }
      http.ServErr = () =>{ this.msgs.push(http.smsgs)}
      http.ConErr = () =>{ this.msgs.push(http.cmsgs)}
    })
  }

 postHash(data:FormData):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('post', '/data/hash/all', data);
      http.send(data);
      http.Complete = ()=> {
        // console.log(data);
        this.hashes= JSON.parse(http.response);
        resolve(this.hashes);
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  pushHash(data:FormData):Promise<any> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('post', '/data/hash/decend', data);
      http.send(data);
      http.Complete = ()=> {
        // console.log(data);
        this.hashes= JSON.parse(http.response);
        resolve(this.hashes);
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  deleteHash(id):Promise<any[]> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('delete', '/data/hash/' + id);
      http.send();
      http.Complete = ()=> {
        this.hashes= JSON.parse(http.response);
        resolve(this.hashes);
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  deleteHashDecend(id, parentId):Promise<any[]> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('delete', '/data/hash/decend/' + id + '/' + parentId);
      http.send();
      http.Complete = ()=> {
        this.hashes= JSON.parse(http.response);
        resolve(this.hashes);
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  deleteWord(parentId, name):Promise<any[]> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('delete', '/data/hash/sub/' + parentId + '/' + name);
      http.send();
      http.Complete = ()=> {
        this.hashes= JSON.parse(http.response);
        resolve(this.hashes);
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  postWords(data:FormData):Promise<any[]> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('post', '/data/hash/sub/all', data);
      http.send(data);
      http.Complete = ()=> {
        this.hashes= JSON.parse(http.response);
        resolve(this.hashes);
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getHashSubs() {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('get', '/data/hash/sub/all');
      http.send();
      http.ServErr = () =>{ this.msgs.push(http.smsgs) }
      http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
      http.Complete = ()=> {
      this.hashSubs= JSON.parse(http.response);
      resolve(this.hashSubs);
      }
    })
  }
}
