import { Component, OnInit } from '@angular/core';
import { Admin  } from '../get-data/get-data'
import { Req2 } from '../get-data/get-public-data.service'
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [],

})
export class FooterComponent implements OnInit {
  public admin: Admin;
  // public isDataLoaded:boolean = false;
  public isAdminLoaded:boolean;
  public msgs: Message[] = [];
  constructor(
    private msgSrv: MessageService,
  ){}

  ngOnInit() {
    let http = new Req2('get', '/admin')
    http.send();
    http.Complete = ()=> {
      // console.log(typeof http.response)
      this.admin = JSON.parse(http.response)[0];
      this.isAdminLoaded= true
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }

    // this.dataService.getAdmin()
    // .subscribe(admin => {
    //   this.admin = admin[0];
    //   console.log(admin);
    //   this.isDataLoaded = true;
    //   // console.log(this.admin)
    // });
  }

}
