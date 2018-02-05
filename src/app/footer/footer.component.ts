// ################################################################## //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : footer                                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppServices } from './../service/app.services';
import { AppModels } from  './../service/app.models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [],

})
export class FooterComponent implements OnInit {
  public msgs: Message[] = [];
  constructor(
    private msgSrv: MessageService,
    public serv: AppServices,
    public model: AppModels,
  ){}

  ngOnInit() {
    this.serv.getAdmin()
    .then(data=> {
      this.model.admin = data[0];
    })
    .catch(msg=> {
      this.msgs=[];
      this.msgs.push(msg)
    })
  }

}
