import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from'
import { HttpEvent } from '@angular/common/http/src/response';

export class YHttp{

  public method:string;
  public url:string;
  public isCon:boolean;
  public isServer:boolean;
  public status: number;
  public response: string;
  public isLoaded:boolean = false;

  public ConErr:Function;
  public ServErr:Function;
  public AuthErr:Function;
  public Complete:Function;

  constructor(method, url, data?:FormData) {
    this.method = method;
    this.url = url;
  }

  public send(data?:FormData, header?:{key:string, value:string}) {
      let xhttp = new XMLHttpRequest;
      xhttp.open(this.method, this.url, true);
      if(header) {
        xhttp.setRequestHeader(header.key, header.value);
      }
      console.log(xhttp.getResponseHeader('Access-Control-Allow-Origin'));
      xhttp.withCredentials = true;
      xhttp.onreadystatechange = () => {
        this.status = xhttp.status;
        xhttp.onerror= () => {
            this.ConErr();
        }

        xhttp.onload= () => {
          this.status = xhttp.status;
          if(xhttp.status >= 200 && xhttp.status <= 300 || xhttp.status == 304 || xhttp.status == 302) {
            this.response = xhttp.response;
            this.Complete() ;
          } else if (xhttp.status == 401 || xhttp.status == 402 ){
            this.AuthErr();
          } else {
            this.ServErr();
          }
        }
      }
      if(data) {
        xhttp.send(data);
      } else {
        xhttp.send();
      }
  }



}
