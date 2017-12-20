import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Job, Dept } from './get-data';

const httpOptions = {
    headers: new HttpHeaders({'Content-typ': 'application/json'})
};


@Injectable()
export class GetPublicDataService {
  private apiUrl:string = 'http://localhost:3001/api/data'

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {

  const url:string =  this.apiUrl + "/jobs";

  // Get Registered Job List
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
