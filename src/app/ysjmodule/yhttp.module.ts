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
  public Complete:Function;

  constructor(method, url, data?:FormData) {
    this.method = method;
    this.url = url;
  }

  public send(data?:FormData) {
      let xhttp = new XMLHttpRequest;
      xhttp.open(this.method, this.url, true);

      xhttp.onreadystatechange = () => {
        xhttp.onerror= () => {
            this.ConErr();
        }

        xhttp.onload= () => {
          if(xhttp.status >= 200 && xhttp.status <= 300 || xhttp.status == 304) {
            this.response = xhttp.response;
            this.Complete();
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
