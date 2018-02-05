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

  getHashes(page?:number):Promise<any[]> {
    return new Promise((resolve, reject)=>{
    let http = page ?
      new Req2('get', '/data/hash/all/' + page) :
      new Req2('get', '/data/hash/')
      http.send();
      http.Complete = ()=> {
        this.hashes= JSON.parse(http.response);
        // console.log(this.hashes);
        resolve(this.hashes);
      }
      http.ServErr = () =>{ this.msgs.push(http.smsgs)}
      http.ConErr = () =>{ this.msgs.push(http.cmsgs)}
    })
  }

  getHash(idHASH):Promise<Hash> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('get', '/data/hash/' + idHASH);
      http.send();
      http.Complete = ()=> {
        this.hash = JSON.parse(http.response);
        // console.log(this.hash);
        resolve(this.hash);
      }
      http.ServErr = () =>{ this.msgs.push(http.smsgs)}
      http.ConErr = () =>{ this.msgs.push(http.cmsgs)}
    })
  }

  getHashNum(idHASH):Promise<Hash> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('get', '/data/hash/number/' + idHASH);
      http.send();
      http.Complete = ()=> {
        this.hash = JSON.parse(http.response);
        // console.log(this.hash);
        resolve(this.hash);
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

  deleteWord(parentId, subId):Promise<any[]> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('delete', '/data/hash/sub/' + parentId + '/' + subId);
      http.send();
      http.Complete = ()=> {
        this.hashes= JSON.parse(http.response);
        resolve(this.hashes);
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  postWord(data:FormData):Promise<any[]> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('post', '/data/hash/sub', data);
      http.send(data);
      http.Complete = ()=> {
        this.hashes= JSON.parse(http.response);
        resolve(this.hashes);
      }
      http.ServErr = () =>{ reject(http.smsgs)}
      http.ConErr = () =>{ reject(http.cmsgs)}
    })
  }

  getHashSub(idHASH):Promise<HashSub[]> {
    return new Promise((resolve, reject)=>{
      let http =  new Req2('get', '/data/hash/sub/' + idHASH);
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
