import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YHttp } from  '../ysjmodule/yhttp.module';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Job, Dept, Admin } from './get-data';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

const httpOptions = {
    headers: new HttpHeaders({'Content-typ': 'application/json'})
};


@Injectable()
export class GetPublicDataService{
  private apiUrl:string = 'http://localhost:3001/api/data';
  // private http:YHttp;

  constructor(private http:HttpClient) {}

  getJobs(): Observable<Job[]> {

  const url:string =  this.apiUrl + "/jobs";

  return this.http.get<Job[]>(url)
    .pipe(
      tap(jobs=>{}),
      catchError(this.handleError<any>(''))
    );
  }


  // Get Registered Facility List
  getDepts(): Observable<Dept[]> {

  const url:string =  this.apiUrl + "/depts";

  return this.http.get<Dept[]>(url)
    .pipe(
      tap(depts=>{}),
      catchError(this.handleError<any>(''))
    );
  }

  getAdmin(): Observable<Admin[]> {

  const url:string =  this.apiUrl + "/admin";

  return this.http.get<Admin[]>(url)
    .pipe(
      tap(admin=>{}),
      catchError(this.handleError<any>(''))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {

     // TODO: send the error to remote logging infrastructure
     console.error(error); // log to console instead

     // TODO: better job of transforming error for user consumption
     console.log(`${operation} failed: ${error.message}`);

     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
  }
}


export class Req {
  public method:string;
  public url:string;
  public formData:FormData;
  public msgs = []
  public Complete:Function;
  public ConErr:Function;
  public ServErr:Function;
  public Response:Function;

  private apiUrl:string = 'http://localhost:3001/api/data';

  constructor(method, url, formData?:FormData) {
    this.method=method;
    this.url=url;
    this.formData=formData;
  }

  public send(formData?:FormData) {
    let http = new YHttp(this.method, this.apiUrl + this.url, this.formData);
    this.Complete = http.Complete;
    this.ConErr = http.Complete;
    this.ServErr = http.Complete;

    if(formData) {
      http.send(this.formData);
    } else {
      http.send();
    }

    let msgs = []
    http.ConErr= () => {
        this.msgs.push({
        severity: 'error',
        summary: '네트워크 연결이 불안합니다.',
        detail: '네트워크 연결이 불안합니다. 잠시 후 시도해 주세요.'});
    }
    http.ServErr = ()=> {
        this.msgs.push({
        severity: 'error',
        summary: '요청에 실패했습니다',
        detail: '요청에 실패했습니다. 잠시 후 시도해 주세요.'});
    }
  }
};

export class Req2 extends YHttp {
  private apiUrl:string = 'http://localhost:3001/api/data';

  public cmsgs:any = {
    severity: 'error',
    summary: '네트워크 연결이 불안합니다.',
    detail: '네트워크 연결이 불안합니다. 잠시 후 시도해 주세요.'
  };
  public smsgs:any = {
    severity: 'error',
    summary: '요청에 실패했습니다',
    detail: '요청에 실패했습니다. 잠시 후 시도해 주세요.'
  };
  constructor(method, url, formData?:FormData) {
    super(method, url, formData);
    this.url = this.apiUrl + url
  }

}
